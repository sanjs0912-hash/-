from embeddings import model
from vectorstore import search_index

def retrieve(query, index, chunks):
    query_vec = model.encode([query]).astype("float32")
    ids = search_index(index, query_vec, k=3)
    return [chunks[i] for i in ids]

