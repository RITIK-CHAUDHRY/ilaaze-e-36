from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

# Load the summarization pipeline with your model
summarizer = pipeline("summarization", model="Falconsai/medical_summarization")

app = FastAPI()

class Document(BaseModel):
    text: str

@app.post("/summarize")
def summarize(document: Document):
    result = summarizer(
        document.text,
        max_length=2000,
        min_length=10,
        do_sample=False
    )
    return {"summary": result[0]['summary_text']}
