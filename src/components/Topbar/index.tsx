import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  IconButton,
  InputBase,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  styled,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from '@mui/material';
import { ColorModeContext } from '../../styles/theme';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import CloudDownloadRoundedIcon from '@mui/icons-material/CloudDownloadRounded';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import CardGiftcardRoundedIcon from '@mui/icons-material/CardGiftcardRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Remova ou defina seu próprio componente Hamburger conforme necessário
// import Hamburger from './Hamburger';

// Estilo personalizado para Tooltips usando o Material-UI 'styled'
// Definição anterior do CustomTooltip foi substituída por esta
const CustomTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    fontSize: "0.8rem",
    borderRadius: "4px",
  },
  [`& .MuiTooltip-arrow`]: {
    color: theme.palette.background.default,
  },
}));


const Topbar = () => {
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(userMenuAnchorEl);
  const [addMenuAnchorEl, setAddMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isAddMenuOpen = Boolean(addMenuAnchorEl);
  const [timesheetPopupOpen, setTimesheetPopupOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery('(max-width:766px)');
  const showHamburgerMenu = useMediaQuery('(max-width:1023px)');
  const adjustSearch = useMediaQuery('(max-width:1023px)');

  const router = useRouter();

  const handleCloudClick = () => {
    router.push('/search-result');
  };
  const handleSearchClick = () => {
    router.push('/search-result/');
  };
  const handleLogoClick = () => {
    router.push('/workspace');
  };
  const handleSettingsClick = () => {
    router.push('/admin/');
  };
  const handleAddMenuClose = () => {
    setAddMenuAnchorEl(null);
  };
  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };
  const handleTimesheetClick = () => {
    setTimesheetPopupOpen(true);
  };
  const handleClosePopup = () => {
    setTimesheetPopupOpen(false);
  };
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAddMenuAnchorEl(event.currentTarget);
  };
  const handleUserMenuOpen = (event: React.MouseEvent<HTMLDivElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        setDrawerOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <Box
      display="flex"
      alignItems="center"
      p={1.4}
      sx={{
        bgcolor: theme.palette.background.paper,
        boxShadow: '0 2px 4px rgba(112, 112, 112, 0.1)',
        zIndex: 20001,
        visibility: drawerOpen ? 'hidden' : 'visible',
      }}
    >
      {/* Logo */}
      <Box
        component="img"
        sx={{
          width: isMobile ? '28px' : '140px',
          marginLeft: '15px',
          marginRight: isMobile ? '10px' : '150px',
          cursor: 'pointer',
        }}
        alt="Logo"
        onClick={handleLogoClick}
        src={isMobile ? '/assets/logo-mobile.png' : '/assets/logo.png'}
        />

      {/* Campo de busca */}
      <Box
        display="flex"
        alignItems="center"
        sx={{
          width: adjustSearch ? 'auto' : {
            xs: '320px',
            md: `calc(320px + ${(480 - 320) / (1600 - 1050)} * (100vw - 1050px))`,
            lg: '480px',
          },
          height: '40px',
          border: '1px solid #F3F3F4',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(93, 93, 93, 0.1)',
          '&:focus-within': {
            borderColor: '#003380',
            boxShadow: '0 2px 4px rgba(0, 92, 168, 0.5)',
          },
          flex: adjustSearch ? 1 : 'none',
          marginLeft: { xs: '10px', sm: '-90px', md: '-57px', lg: '-50px' },
          marginRight: adjustSearch ? 1 : 'none',
          "@media screen and (min-width: 600px) and (max-width: 767px)": {
            marginLeft: '10px',
          },
        }}
      >
        <InputBase
          sx={{
            ml: 2,
            flex: 1,
            height: '100%',
            color: theme.palette.text.primary,
          }}
          placeholder="Pesquisar contato, processo ou tarefa"
        />
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton
          type="submit"
          sx={{
            p: '10px',
            color: 'rgba(0, 0, 0, 0.54)',
          }}
          onClick={handleSearchClick}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      {/* Botões de ação */}
      <CustomTooltip title="Adicionar" placement="bottom" arrow>
        <IconButton onClick={handleAddClick}>
          <AddRoundedIcon />
        </IconButton>
      </CustomTooltip>

      <CustomTooltip title="Resultados de buscas" placement="bottom" arrow>
        <IconButton onClick={handleCloudClick}>
          <CloudDownloadRoundedIcon />
        </IconButton>
      </CustomTooltip>

      <CustomTooltip title="Cronômetro timesheet" placement="bottom" arrow>
        <IconButton onClick={handleTimesheetClick}>
          <WatchLaterOutlinedIcon />
        </IconButton>
      </CustomTooltip>

      <CustomTooltip title="Novidades astrea" placement="bottom" arrow>
        <IconButton>
          <CardGiftcardRoundedIcon />
        </IconButton>
      </CustomTooltip>

      <CustomTooltip title="Administração" placement="bottom" arrow>
        <IconButton onClick={handleSettingsClick}>
          <SettingsIcon />
        </IconButton>
      </CustomTooltip>
      <Box sx={{ flexGrow: 0.009 }} />


      {/* Menu do usuário */}
      <Box
        sx={{
          ml: 'auto',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          mr: '25px',
        }}
        onClick={handleUserMenuOpen}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          heghbertho gomes
        </Typography>
        <ArrowDropDownIcon />
      </Box>

      <Menu
        anchorEl={userMenuAnchorEl}
        open={isUserMenuOpen}
        onClose={handleUserMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleUserMenuClose}>Meu perfil</MenuItem>
        <MenuItem onClick={handleUserMenuClose}>Plano de uso</MenuItem>
        <Divider />
        <MenuItem onClick={handleUserMenuClose}>Sair</MenuItem>
      </Menu>

      {/* Menu suspenso para o botão Adicionar */}
      <Menu
        anchorEl={addMenuAnchorEl}
        open={isAddMenuOpen}
        onClose={handleAddMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleAddMenuClose}>Processo manual</MenuItem>
        <MenuItem onClick={handleAddMenuClose}>Processo busca automática</MenuItem>
        <MenuItem onClick={handleAddMenuClose}>Caso</MenuItem>
        <MenuItem onClick={handleAddMenuClose}>Atendimento</MenuItem>
        <Divider />
        <MenuItem onClick={handleAddMenuClose}>Tarefa</MenuItem>
        <MenuItem onClick={handleAddMenuClose}>Evento</MenuItem>
        <Divider />
        <MenuItem onClick={handleAddMenuClose}>Contato</MenuItem>
      </Menu>

      {/* Dialog de Timesheet */}
      <Dialog
        open={timesheetPopupOpen}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleClosePopup();
          }
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography variant="h4" component="h2" sx={{ fontWeight: '600' }}>
            Dê o próximo passo na gestão do seu escritório
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Essa funcionalidade é exclusiva dos planos Up, Smart, Company e Vip.
            Faça um upgrade e desbloqueie recursos como recebimento automático
            de publicações, gestão financeira e controle de prazos para evoluir
            ainda mais a sua advocacia.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClosePopup}
            sx={{ color: theme.palette.text.primary }}
          >
            DEIXAR PARA DEPOIS
          </Button>
          <Button
            onClick={handleClosePopup}
            variant="contained"
            sx={{ bgcolor: theme.palette.primary.main }}
          >
            CONHECER PLANOS
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Topbar;
