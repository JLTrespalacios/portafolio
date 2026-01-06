import os

file_path = "certificaciones.html"
search_str = '<a href="#" class="btn-cert btn-cert-primary" data-i18n="cert.btn.verify">Verificar</a>'

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

new_content = content.replace(search_str, "")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Buttons removed.")
