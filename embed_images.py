import os
import re
import base64
import mimetypes

def embed_images(html_file):
    if not os.path.exists(html_file):
        print(f"File not found: {html_file}")
        return

    print(f"Processing {html_file}...")
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()

    def replace_match(match):
        src = match.group(1)
        # Handle URL encoded spaces if any, though HTML file usually has raw spaces in filenames if local
        # But best to treat as literal path from the src attribute
        
        # Normalize path separators
        local_path = src.replace('/', os.sep)
        file_path = os.path.join(os.getcwd(), local_path)
        
        if not os.path.exists(file_path):
            print(f"  Warning: Image file not found: {file_path}")
            return match.group(0)
            
        mime_type, _ = mimetypes.guess_type(file_path)
        if not mime_type:
            mime_type = 'application/octet-stream'
            
        try:
            with open(file_path, "rb") as image_file:
                encoded_string = base64.b64encode(image_file.read()).decode('utf-8')
            print(f"  Embedded: {src}")
            return f'src="data:{mime_type};base64,{encoded_string}"'
        except Exception as e:
            print(f"  Error reading {file_path}: {e}")
            return match.group(0)

    # Regex to find src="img/..."
    # The pattern matches src=" followed by img/ and then any character that is NOT a quote
    pattern = r'src="(img/[^"]+)"'
    
    new_content = re.sub(pattern, replace_match, content)
    
    with open(html_file, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Finished {html_file}\n")

if __name__ == "__main__":
    embed_images('index.html')
    embed_images('cv.html')
