// src/components/Layout.tsx
import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { Box } from "@mui/material";

type LayoutProps = {
    children: React.ReactNode;
    showTopbar?: boolean;
    showSidebar?: boolean;
};

const Layout: React.FC<LayoutProps> = ({ children, showTopbar = true, showSidebar = true }) => {
    return (
        <Box sx={{
            display: 'flex', // Adiciona flexbox ao contêiner
            flexDirection: 'column', // Organiza os filhos em coluna
            minHeight: '100vh', // Certifica-se de que o layout ocupe toda a altura da viewport
        }}>
            {showTopbar && (
                <Box sx={{ width: '100%', position: 'fixed', zIndex: 1100 }}>
                    <Topbar />
                </Box>
            )}

            <Box sx={{
                display: 'flex', // Cria um flex container para a sidebar e o conteúdo principal
                width: '100%', // Certifica-se de que o container ocupe toda a largura disponível
                marginTop: showTopbar ? '64px' : '0', // Ajusta a margem superior para a altura da Topbar
            }}>
                {showSidebar && (
                    <Box sx={{
                        width: '240px', // Largura fixa para a Sidebar
                        flexShrink: 0, // Impede a Sidebar de encolher
                        minHeight: 'calc(100vh - 64px)', // Altura da viewport menos a altura da Topbar
                        position: 'fixed', // Fixa a Sidebar para rolar independentemente do conteúdo
                    }}>
                        <Sidebar />
                    </Box>
                )}
                <Box component="main" sx={{
                    flexGrow: 1, // Faz o conteúdo principal crescer e ocupar o espaço restante
                    overflowY: 'auto', // Permite a rolagem se o conteúdo for maior que a altura da viewport
                    marginLeft: showSidebar ? '240px' : '0', // Ajusta a margem esquerda para a largura da Sidebar
                    paddingTop: '24px', // Adiciona um pouco de espaço no topo
                }}>
                    {children}
                </Box>
            </Box>
            {/* Aqui você pode adicionar um rodapé se necessário */}
        </Box>
    );
};

export default Layout;
