import numpy as np
try:
    import tensorflow as tf
except Exception:
    tf = None

from typing import Dict, Any, List

ALLOWED_OPS = {
    "constant": "tf.constant(value, dtype=tf.float32)",
    "zeros": "tf.zeros(shape, dtype=tf.float32)",
    "random": "tf.random.normal(shape, mean=0.0, stddev=1.0)",
    "reshape": "tf.reshape(tensor, new_shape)",
    "matmul": "tf.matmul(matrix_a, matrix_b)",
    "broadcasting": "tensor_a + tensor_b (broadcast add)",
    "reduce_sum": "tf.reduce_sum(tensor, axis=axis)",
    "GradientTape": "tf.GradientTape() autograd dy/dx for y = x^2 + 3x + 5"
}

def run_tensor_operation(op: str, params: Dict[str, Any]) -> Dict[str, Any]:
    if op not in ALLOWED_OPS:
        raise ValueError(f"Operation '{op}' is not allowed. Allowed operations: {list(ALLOWED_OPS.keys())}")

    steps = []
    
    if op == "constant":
        val = params.get("value", [1.0, 2.0, 3.0, 4.0])
        steps.append(f"Creating tf.constant from input: {val}")
        if tf is not None:
            t = tf.constant(val, dtype=tf.float32)
            shape = list(t.shape)
            dtype = str(t.dtype.name)
            rank = t.ndim
            result = t.numpy().tolist()
        else:
            arr = np.array(val, dtype=np.float32)
            shape = list(arr.shape)
            dtype = "float32"
            rank = arr.ndim
            result = arr.tolist()
        return {
            "operation": op,
            "steps": steps,
            "shape": shape,
            "dtype": dtype,
            "rank": rank,
            "result": result,
            "explanation": "Constructs an immutable multi-dimensional tensor from array values."
        }

    elif op == "zeros":
        shape = params.get("shape", [2, 3])
        if not isinstance(shape, list) or len(shape) > 4 or any(x > 20 for x in shape):
            raise ValueError("Shape must be a list of up to 4 dimensions (max 20 per dim).")
        steps.append(f"Allocating zero tensor with shape: {shape}")
        if tf is not None:
            t = tf.zeros(shape, dtype=tf.float32)
            out_shape = list(t.shape)
            dtype = str(t.dtype.name)
            rank = t.ndim
            result = t.numpy().tolist()
        else:
            arr = np.zeros(shape, dtype=np.float32)
            out_shape = list(arr.shape)
            dtype = "float32"
            rank = arr.ndim
            result = arr.tolist()
        return {
            "operation": op,
            "steps": steps,
            "shape": out_shape,
            "dtype": dtype,
            "rank": rank,
            "result": result,
            "explanation": "Allocates weights or bias tensors initialized to 0.0."
        }

    elif op == "random":
        shape = params.get("shape", [3, 3])
        seed = int(params.get("seed", 42))
        steps.append(f"Sampling standard normal N(0, 1) tensor shape={shape}, seed={seed}")
        if tf is not None:
            tf.random.set_seed(seed)
            t = tf.random.normal(shape, mean=0.0, stddev=1.0)
            out_shape = list(t.shape)
            dtype = str(t.dtype.name)
            rank = t.ndim
            result = np.round(t.numpy(), 4).tolist()
        else:
            rng = np.random.default_rng(seed)
            arr = rng.normal(0.0, 1.0, shape).astype(np.float32)
            out_shape = list(arr.shape)
            dtype = "float32"
            rank = arr.ndim
            result = np.round(arr, 4).tolist()
        return {
            "operation": op,
            "steps": steps,
            "shape": out_shape,
            "dtype": dtype,
            "rank": rank,
            "result": result,
            "explanation": "Generates stochastic latent vectors used as priors in GANs and Diffusion models."
        }

    elif op == "reshape":
        init_shape = params.get("initial_shape", [2, 4])
        new_shape = params.get("new_shape", [4, 2])
        steps.append(f"Creating sequential vector of length {np.prod(init_shape)} and shaping to {init_shape}")
        if tf is not None:
            base = tf.range(1, np.prod(init_shape) + 1, dtype=tf.float32)
            t_orig = tf.reshape(base, init_shape)
            steps.append(f"Reshaping tensor to {new_shape}")
            t_reshaped = tf.reshape(t_orig, new_shape)
            out_shape = list(t_reshaped.shape)
            dtype = str(t_reshaped.dtype.name)
            result = t_reshaped.numpy().tolist()
        else:
            base = np.arange(1, np.prod(init_shape) + 1, dtype=np.float32).reshape(init_shape)
            steps.append(f"Reshaping tensor to {new_shape}")
            reshaped = base.reshape(new_shape)
            out_shape = list(reshaped.shape)
            dtype = "float32"
            result = reshaped.tolist()
        return {
            "operation": op,
            "steps": steps,
            "shape": out_shape,
            "original_shape": init_shape,
            "dtype": dtype,
            "result": result,
            "explanation": "Alters tensor dimension layout without copying or changing underlying memory order."
        }

    elif op == "matmul":
        a_rows = int(params.get("a_rows", 2))
        a_cols = int(params.get("a_cols", 3))
        b_cols = int(params.get("b_cols", 2))
        steps.append(f"Creating Matrix A [{a_rows}x{a_cols}] and Matrix B [{a_cols}x{b_cols}]")
        mat_a = np.arange(1, a_rows * a_cols + 1, dtype=np.float32).reshape(a_rows, a_cols)
        mat_b = np.ones((a_cols, b_cols), dtype=np.float32)
        steps.append("Multiplying matrices: tf.matmul(A, B)")
        if tf is not None:
            A = tf.constant(mat_a, dtype=tf.float32)
            B = tf.constant(mat_b, dtype=tf.float32)
            C = tf.matmul(A, B)
            out_shape = list(C.shape)
            dtype = str(C.dtype.name)
            result = C.numpy().tolist()
        else:
            C = np.matmul(mat_a, mat_b)
            out_shape = list(C.shape)
            dtype = "float32"
            result = C.tolist()
        return {
            "operation": op,
            "steps": steps,
            "matrix_a": mat_a.tolist(),
            "matrix_b": mat_b.tolist(),
            "shape": out_shape,
            "dtype": dtype,
            "result": result,
            "explanation": "Executes linear transformation C = A x B, the foundational calculation of feed-forward & attention layers."
        }

    elif op == "broadcasting":
        mat_a = [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]
        vec_b = [10.0, 20.0, 30.0]
        steps.append(f"Matrix A shape: [2, 3], Vector B shape: [3]")
        steps.append("Broadcasting Vector B along the rows of Matrix A and summing")
        if tf is not None:
            A = tf.constant(mat_a)
            B = tf.constant(vec_b)
            C = A + B
            out_shape = list(C.shape)
            dtype = str(C.dtype.name)
            result = C.numpy().tolist()
        else:
            C = np.array(mat_a, dtype=np.float32) + np.array(vec_b, dtype=np.float32)
            out_shape = list(C.shape)
            dtype = "float32"
            result = C.tolist()
        return {
            "operation": op,
            "steps": steps,
            "shape": out_shape,
            "dtype": dtype,
            "result": result,
            "explanation": "Implicitly expands smaller dimensions to match larger operand shapes without memory duplication."
        }

    elif op == "reduce_sum":
        axis = params.get("axis", 0)
        data = [[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]]
        steps.append(f"Input tensor: {data} (shape [2, 3])")
        steps.append(f"Computing tf.reduce_sum along axis={axis}")
        if tf is not None:
            t = tf.constant(data, dtype=tf.float32)
            res = tf.reduce_sum(t, axis=axis)
            out_shape = list(res.shape)
            dtype = str(res.dtype.name)
            result = res.numpy().tolist()
        else:
            arr = np.array(data, dtype=np.float32)
            res = np.sum(arr, axis=axis)
            out_shape = list(res.shape)
            dtype = "float32"
            result = res.tolist()
        return {
            "operation": op,
            "steps": steps,
            "shape": out_shape,
            "dtype": dtype,
            "result": result,
            "explanation": "Reduces tensor dimensions by calculating sums along the requested coordinate axis."
        }

    elif op == "GradientTape":
        x_val = float(params.get("x", 3.0))
        steps.append(f"Declaring trainable tf.Variable x = {x_val}")
        steps.append("Entering tf.GradientTape context: y = x^2 + 3*x + 5")
        if tf is not None:
            x = tf.Variable(x_val, dtype=tf.float32)
            with tf.GradientTape() as tape:
                y = x**2 + 3.0 * x + 5.0
            grad = tape.gradient(y, x)
            y_val = float(y.numpy())
            grad_val = float(grad.numpy())
        else:
            y_val = float(x_val**2 + 3.0 * x_val + 5.0)
            grad_val = float(2.0 * x_val + 3.0)
        steps.append("Computing analytical gradient tape.gradient(y, x)")
        steps.append(f"dy/dx = 2*x + 3 = 2*({x_val}) + 3 = {grad_val}")
        return {
            "operation": op,
            "steps": steps,
            "x": x_val,
            "y": y_val,
            "dy_dx": grad_val,
            "formula": "y = x^2 + 3x + 5  =>  dy/dx = 2x + 3",
            "result": {"x": x_val, "y": y_val, "gradient": grad_val},
            "explanation": "Automatic differentiation engine tracking operations to calculate exact backpropagation gradients."
        }

    raise ValueError(f"Unsupported operation: {op}")
