import subprocess

def ask_llava(prompt):
    process = subprocess.Popen(
        ["ollama", "run", "llava"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE
    )
    output = process.communicate(input=prompt.encode())[0]
    return output.decode()

