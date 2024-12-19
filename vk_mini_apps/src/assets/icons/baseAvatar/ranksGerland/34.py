import os

def rename_svg_files(directory):


  for filename in os.listdir(directory):
    print(filename)
    if filename.endswith(".svg"):
      # Разделяем имя файла на части
      parts = filename.split("()")
      if len(parts) > 1:
        # Собираем новое имя файла
        new_filename = parts[1][0] + ")"
        # Переименовываем файл
        os.rename(os.path.join(directory, filename), os.path.join(directory, new_filename))
        print(f"Файл '{filename}' переименован в '{new_filename}'")

# Пример использования
directory = "C:/Users/kir/Desktop/vk_mini_apps/src/assets/icons/ranksGerland"
rename_svg_files(directory)
