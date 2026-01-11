import os
import re

# Directory containing HTML files
directory = r"c:\Users\salva\.gemini\antigravity\scratch\SERVIAIRE"

# Pattern to find and replace
pattern = r'src="\.\/'
replacement = 'src="/'

# Counter for changes
total_changes = 0

# Process all HTML files
for filename in os.listdir(directory):
    if filename.endswith('.html'):
        filepath = os.path.join(directory, filename)
        
        try:
            # Read file
            with open(filepath, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Count matches before replacement
            matches = len(re.findall(pattern, content))
            
            if matches > 0:
                # Replace
                new_content = re.sub(pattern, replacement, content)
                
                # Write back
                with open(filepath, 'w', encoding='utf-8') as file:
                    file.write(new_content)
                
                print(f"✓ {filename}: {matches} cambios")
                total_changes += matches
        except Exception as e:
            print(f"✗ Error en {filename}: {e}")

print(f"\n✅ Total: {total_changes} rutas corregidas en archivos HTML")
