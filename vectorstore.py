import faiss

def build_index(vectors):
    dim = vectors.shape[1]
    index = faiss.IndexFlatL2(dim)
    index.add(vectors)
    return index

def search_index(index, query_vector, k=3):
    distances, ids = index.search(query_vector, k)
    return ids[0]

