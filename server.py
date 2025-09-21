#!/usr/bin/env python3
"""
Servidor HTTP simples para o sistema Liga da Balança
Versão: 1.0.0
"""

import http.server
import socketserver
import webbrowser
import os
import sys
from pathlib import Path

# Configurações do servidor
PORT = 8000
HOST = 'localhost'

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    """Handler personalizado para servir arquivos estáticos"""
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Adiciona headers para CORS e cache
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()
    
    def log_message(self, format, *args):
        """Log personalizado para o servidor"""
        print(f"[{self.log_date_time_string()}] {format % args}")

def check_files():
    """Verifica se os arquivos necessários existem"""
    required_files = ['index.html', 'styles.css']
    missing_files = []
    
    for file in required_files:
        if not os.path.exists(file):
            missing_files.append(file)
    
    if missing_files:
        print(f"❌ Arquivos obrigatórios não encontrados: {', '.join(missing_files)}")
        return False
    
    print("✅ Todos os arquivos necessários encontrados")
    return True

def start_server():
    """Inicia o servidor HTTP"""
    print("🏆 Liga da Balança - Sistema de Competição de Perda de Peso")
    print("=" * 60)
    
    # Verifica arquivos necessários
    if not check_files():
        sys.exit(1)
    
    try:
        # Configura o servidor
        with socketserver.TCPServer((HOST, PORT), CustomHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor iniciado em http://{HOST}:{PORT}")
            print(f"📁 Diretório: {os.getcwd()}")
            print("=" * 60)
            print("📋 Instruções:")
            print("1. Abra seu navegador")
            print("2. Acesse http://localhost:8000")
            print("3. Configure a competição")
            print("4. Adicione participantes")
            print("5. Registre pesagens")
            print("=" * 60)
            print("⏹️  Pressione Ctrl+C para parar o servidor")
            print()
            
            # Tenta abrir o navegador automaticamente
            try:
                webbrowser.open(f'http://{HOST}:{PORT}')
                print("🌐 Navegador aberto automaticamente")
            except:
                print("⚠️  Não foi possível abrir o navegador automaticamente")
            
            print()
            
            # Inicia o servidor
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n⏹️  Servidor parado pelo usuário")
        sys.exit(0)
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Erro: Porta {PORT} já está em uso")
            print("💡 Tente:")
            print("   - Fechar outras instâncias do servidor")
            print("   - Usar uma porta diferente")
            print("   - Aguardar alguns segundos e tentar novamente")
        else:
            print(f"❌ Erro ao iniciar servidor: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Erro inesperado: {e}")
        sys.exit(1)

def main():
    """Função principal"""
    print("Python version:", sys.version)
    print("Working directory:", os.getcwd())
    print()
    
    start_server()

if __name__ == "__main__":
    main()

