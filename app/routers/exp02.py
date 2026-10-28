from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Dict, Any, List
import json

from app.services.tensor_sandbox import run_tensor_operation, ALLOWED_OPS
from app.config import NOTEBOOKS_FILE

router = APIRouter(prefix="/api/exp02", tags=["Exp 02 - TensorFlow 2 Tensors"])

EXP_INFO = {
    "id": 2,
    "title": "Basic Python Operations and TensorFlow 2 Tensor Operations for Generative AI Applications",
    "aim": "Understand and implement basic Python operations and TensorFlow 2 tensor operations to build a foundation for generative AI.",
    "tags": ["TensorFlow 2", "Tensors", "Matrix Operations", "GradientTape", "Autograd"],
    "pipeline": [
        "1. Operation Selection: Pick from whitelist of tensor primitives (constant, zeros, random, reshape, etc.)",
        "2. Parameter Validation: Sanitize dimensions, shapes, and input data without code execution",
        "3. Computation Graph: Execute operation through TensorFlow 2 eager execution runtime",
        "4. Autograd Tracking: Use tf.GradientTape to record automatic differentiation and derivatives",
        "5. Inspection & Telemetry: Return shapes, rank, dtype, and visual step breakdown"
    ],
    "code_snippet": '''import tensorflow as tf

# 1. Tensors and Shapes
t = tf.random.normal([2, 3], mean=0.0, stddev=1.0)
print(t.shape, t.dtype)

# 2. Matrix Multiplication
A = tf.constant([[1.0, 2.0], [3.0, 4.0]])
B = tf.constant([[5.0, 6.0], [7.0, 8.0]])
C = tf.matmul(A, B)

# 3. Automatic Differentiation with GradientTape
x = tf.Variable(3.0)
with tf.GradientTape() as tape:
    y = x**2 + 3.0*x + 5.0
dy_dx = tape.gradient(y, x) # Result: 2*(3) + 3 = 9.0'''
}

class TensorOpRequest(BaseModel):
    operation: str
    params: Dict[str, Any] = {}

@router.get("/info")
def get_info():
    with open(NOTEBOOKS_FILE, "r") as f:
        nb_data = json.load(f).get("2", {})
    return {**EXP_INFO, "allowed_operations": list(ALLOWED_OPS.keys()), "notebook": nb_data}

@router.post("/run-op")
def execute_tensor_op(req: TensorOpRequest):
    try:
        result = run_tensor_operation(req.operation, req.params)
        return result
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Tensor computation error: {str(e)}")
