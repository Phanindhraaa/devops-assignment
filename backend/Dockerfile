FROM python:3.11-slim AS builder

WORKDIR /app

COPY requirements.txt .

# Install dependencies to a clean folder
RUN pip install --upgrade pip \
  && pip install --prefix=/install -r requirements.txt

# ---------- Stage 2: Final Runtime Image ----------
FROM python:3.11-slim AS runner

WORKDIR /app

RUN apt-get update && apt-get install -y curl --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Copy installed packages from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY main.py .
COPY test_main.py .   

# Expose Flask port
EXPOSE 5000

# Start Flask app
CMD ["python", "main.py"]
