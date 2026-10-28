from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from fastapi.responses import JSONResponse, FileResponse
import pandas as pd
import numpy as np
import io
import json
from pathlib import Path
from typing import Optional

from app.config import OUTPUTS_DIR, NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp01", tags=["Exp 01 - Dataset Analysis"])

EXP_INFO = {
    "id": 1,
    "title": "Comprehensive Dataset Analysis and Preprocessing for Generative AI using Python Libraries",
    "aim": "Understand, explore, preprocess and analyze any dataset like a data scientist using NumPy, Pandas, Matplotlib, Seaborn, Scikit-learn, TensorFlow, Keras, PyTorch and LangChain, and prepare high-quality datasets for Generative AI and ML.",
    "tags": ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "Data Preprocessing"],
    "pipeline": [
        "1. Ingestion: Load raw tabular dataset (CSV) into Pandas DataFrame",
        "2. Structural Profiling: Inspect dimensions, data types, and head snapshot",
        "3. Statistical Summary: Calculate central tendency, dispersion, quartiles, and IQR outliers",
        "4. Quality Audit: Identify missing values, duplicate records, and high-correlation features",
        "5. Preprocessing & Transformation: Imputation, categorical encoding, scaling, and train/test partition",
        "6. Export: Download AI-ready dataset artifact for GenAI/ML downstream training"
    ],
    "code_snippet": '''import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.model_selection import train_test_split

# 1. Load and inspect
df = pd.read_csv('dataset.csv')
print(df.info(), df.describe())

# 2. IQR Outlier Detection
Q1 = df['val'].quantile(0.25)
Q3 = df['val'].quantile(0.75)
IQR = Q3 - Q1
outliers = df[(df['val'] < Q1 - 1.5 * IQR) | (df['val'] > Q3 + 1.5 * IQR)]

# 3. Imputation and Scaling
df.fillna(df.median(numeric_only=True), inplace=True)
scaler = StandardScaler()
df[numeric_cols] = scaler.fit_transform(df[numeric_cols])

# 4. Partition
train_df, test_df = train_test_split(df, test_size=0.2, random_state=42)'''
}

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("1", {})
    return {**EXP_INFO, "notebook": nb_data}

@router.get("/sample-dataset")
def get_sample_dataset():
    # Built-in synthetic customer AI dataset
    np.random.seed(42)
    n = 150
    ages = np.random.randint(18, 70, n)
    incomes = np.random.normal(55000, 15000, n).round()
    scores = np.random.uniform(1, 100, n).round(1)
    categories = np.random.choice(["Standard", "Premium", "Enterprise"], n, p=[0.5, 0.3, 0.2])
    
    # Introduce deliberate missing values and outliers for educational analysis
    ages = [None if i in [5, 12, 45] else a for i, a in enumerate(ages)]
    incomes[10] = 250000.0 # Outlier
    incomes[25] = 275000.0 # Outlier

    df = pd.DataFrame({
        "Customer_ID": np.arange(1001, 1001 + n),
        "Age": ages,
        "Annual_Income": incomes,
        "Engagement_Score": scores,
        "Segment": categories
    })
    
    csv_str = df.to_csv(index=False)
    return {"csv_data": csv_str, "filename": "sample_customer_genai.csv"}

@router.post("/analyze")
async def analyze_csv(file: UploadFile = File(...)):
    contents = await file.read()
    if len(contents) > 26214400:
        raise HTTPException(status_code=400, detail="File exceeds 25 MB upload limit.")
    
    try:
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Failed to parse CSV file: {str(e)}. Fix hint: verify the file is a valid UTF-8 formatted CSV.")

    shape = list(df.shape)
    dtypes = {col: str(dtype) for col, dtype in df.dtypes.items()}
    head = df.head(5).to_dict(orient="records")
    missing = df.isnull().sum().to_dict()
    
    # Numerical describe
    numeric_df = df.select_dtypes(include=[np.number])
    describe = {}
    outliers = {}
    correlations = {}
    
    if not numeric_df.empty:
        desc_raw = numeric_df.describe().round(3).to_dict()
        describe = desc_raw
        
        # IQR Outliers
        for col in numeric_df.columns:
            q1 = float(numeric_df[col].quantile(0.25))
            q3 = float(numeric_df[col].quantile(0.75))
            iqr = q3 - q1
            lower = q1 - 1.5 * iqr
            upper = q3 + 1.5 * iqr
            count = int(((numeric_df[col] < lower) | (numeric_df[col] > upper)).sum())
            outliers[col] = {"q1": q1, "q3": q3, "iqr": round(iqr, 2), "outlier_count": count}

        # Correlation matrix
        if len(numeric_df.columns) > 1:
            corr_mat = numeric_df.corr().round(3).fillna(0).to_dict()
            correlations = corr_mat

    return {
        "filename": file.filename,
        "shape": shape,
        "dtypes": dtypes,
        "head": head,
        "missing_values": missing,
        "describe": describe,
        "outliers": outliers,
        "correlations": correlations
    }

@router.post("/preprocess")
async def preprocess_csv(
    file: UploadFile = File(...),
    impute_strategy: str = Form("median"), # 'mean', 'median', 'drop'
    encode_categoricals: bool = Form(True),
    scale_numeric: bool = Form(True),
    test_split_ratio: float = Form(0.2)
):
    contents = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(contents))
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Invalid CSV: {str(e)}")

    # 1. Missing value handling
    if impute_strategy == "drop":
        df = df.dropna()
    elif impute_strategy == "mean":
        df = df.fillna(df.mean(numeric_only=True))
    else:
        df = df.fillna(df.median(numeric_only=True))

    # 2. Encode categoricals
    if encode_categoricals:
        cat_cols = df.select_dtypes(include=["object", "category"]).columns
        for col in cat_cols:
            df[col] = df[col].astype("category").cat.codes

    # 3. Scale numericals
    if scale_numeric:
        num_cols = df.select_dtypes(include=[np.number]).columns
        for col in num_cols:
            std = df[col].std()
            if std > 1e-6:
                df[col] = (df[col] - df[col].mean()) / std

    # Save cleaned CSV artifact
    clean_filename = f"cleaned_{file.filename.replace('.csv', '')}.csv"
    clean_path = OUTPUTS_DIR / clean_filename
    df.round(4).to_csv(clean_path, index=False)

    return {
        "status": "success",
        "cleaned_shape": list(df.shape),
        "download_url": f"/outputs/{clean_filename}",
        "preview": df.head(5).to_dict(orient="records"),
        "train_rows": int(len(df) * (1 - test_split_ratio)),
        "test_rows": int(len(df) * test_split_ratio)
    }
