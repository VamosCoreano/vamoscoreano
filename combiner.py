import os

# 1. 합치고 싶은 확장자들을 적어주세요 (필요에 따라 추가/수정 가능)
TARGET_EXTENSIONS = {'.js', '.html', '.css', '.py', '.json', '.md'}

# 2. 제외할 폴더 이름들 (여기에 있는 폴더들은 검색에서 아예 제외됩니다)
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', 'build', '__pycache__', '.vscode', 'venv'}

OUTPUT_FILENAME = 'all_code.txt'

def bundle_code():
    current_dir = os.getcwd()
    print(f"[*] 현재 디렉토리에서 코드 수집 시작: {current_dir}")
    
    file_count = 0
    with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as outfile:
        for root, dirs, files in os.walk(current_dir):
            # 제외할 폴더 목록에 걸리는 폴더는 탐색하지 않음
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            
            for file in files:
                ext = os.path.splitext(file)[1].lower()
                if ext in TARGET_EXTENSIONS:
                    file_path = os.path.join(root, file)
                    rel_path = os.path.relpath(file_path, current_dir)
                    
                    # 자기 자신(all_code.txt)이나 스크립트 파일은 제외
                    if rel_path == OUTPUT_FILENAME or rel_path == 'combiner.py':
                        continue
                    
                    # 따옴표 누락 수정 완료!
                    print(f"포함 중: {rel_path}")
                    
                    # 파일 구분선 및 경로 표시
                    outfile.write(f"\n\n{'='*80}\n")
                    outfile.write(f"FILE: {rel_path}\n")
                    outfile.write(f"{'='*80}\n\n")
                    
                    try:
                        with open(file_path, 'r', encoding='utf-8') as infile:
                            outfile.write(infile.read())
                        file_count += 1
                    except Exception as e:
                        outfile.write(f"[읽기 오류 발생: {e}]\n")
                        
    print(f"\n[완료] 총 {file_count}개의 파일이 '{OUTPUT_FILENAME}'에 성공적으로 묶였습니다람쥐!")

if __name__ == '__main__':
    bundle_code()