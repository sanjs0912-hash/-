from pdf_processing import extract_text_from_pdf
from chunking import chunk_text
from embeddings import embed_chunks, model
from vectorstore import build_index
from rag import retrieve
from llava_interface import ask_llava

# 1. Read PDF
pdf_path = "roleplay.pdf"
text = extract_text_from_pdf(pdf_path)

# 2. Chunk
chunks = chunk_text(text)

# 3. Embed chunks
vectors = embed_chunks(chunks)

# 4. Build FAISS index
index = build_index(vectors)

# 5. Ask questions
while True:
    query = input("\nAsk a question about the PDF: ")

    # 6. Retrieve relevant chunks
    relevant_chunks = retrieve(query, index, chunks)

    context = "\n\n".join(relevant_chunks)

    prompt = f"""
You are reading a document.

Here is relevant context from the PDF:

{context}

Now answer the question:
{query}
"""

    # 7. LLaVA answers
    answer = ask_llava(prompt)
    print("\nLLaVA Answer:\n", answer)

