import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import {
  Box,
  Typography,
  useMediaQuery,
  Divider,
  styled,
  IconButton
} from "@mui/material";
import "react-pro-sidebar/dist/css/styles.css";
import InfoIcon from "@mui/icons-material/Info";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";

import Tooltip from "@mui/material/Tooltip"; // Importe o Tooltip do Material-UI aqui

const CustomTooltip = styled(Tooltip)(({ theme }) => ({
  [`& .MuiTooltip-tooltip`]: {
    backgroundColor: "white",
    color: "black",
    fontSize: "1rem",
    borderRadius: "4px",
    boxShadow: theme.shadows[1],
    width: "259px",
    height: "160px",
    padding: theme.spacing(2.5),
    wordWrap: "break-word",
    wordBreak: "break-word",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  [`& .MuiTooltip-arrow`]: {
    backgroundColor: "white",
  },
}));

type RouteToTitleMap = {
  [key: string]: string;
};

const routeToTitleMap: RouteToTitleMap = {
  "/workspace": "Área de Trabalho",
  "/schedule": "Agenda",
  "/contacts": "Contatos",
  "/consulting": "Atendimentos",
  "/folders": "Processos e Casos",
  "/clippings": "Atividades",
  "/clients": "Clientes",
  "/financial": "Financeiro",
  "/documents": "Documentos",
  "/dashboard-module": "Indicadores",
  "/alerts": "Alertas",
  "/support": "Suporte",
};

const Item: React.FC<{
  title: string;
  to: string;
  icon: React.ReactNode;
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}> = ({ title, to, icon, selected, setSelected }) => {
  const router = useRouter();

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: `#4e4e4e`,
        paddingLeft: "0.1em",
        marginBottom: "-0.3em",
      }}
      onClick={() => {
        setSelected(title);
        router.push(to); // Usando o roteamento do Next.js aqui
      }}
      icon={icon}
    >
      <Box display="flex" alignItems="center">
        <Typography>{title}</Typography>
      </Box>
    </MenuItem>
  );
};

const SupportItem: React.FC<{
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}> = ({ selected, setSelected }) => {
  const router = useRouter();

  const handleClick = () => {
    setSelected("Suporte");
    router.push("/support");
  };

  const isSelected = selected === "Suporte";
  const itemColor = isSelected ? "#000000" : "#242424";

  return (
    <MenuItem
      active={isSelected}
      onClick={handleClick}
      icon={
        <HelpOutlineOutlinedIcon
          style={{
            color: `#4e4e4e`,
            paddingLeft: "0.1em",
            marginBottom: "-0.1em",
            marginRight: "-0.2em",
            position: "relative",
          }}
        />
      }
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ flexGrow: 1, color: itemColor }}>
          Suporte
        </Typography>
        <CustomTooltip
          title={
            <span>
              Um <b>espaço de conteúdo exclusivo e gratuito</b> para você se{" "}
              <b>aprofundar com os conhecimentos do Astrea</b>, com dicas dadas
              por especialistas da Aurum.
            </span>
          }
          placement="right"
          arrow
        >
          <IconButton size="small" sx={{ mr: 10, color: "#0062FF" }}>
            <InfoIcon />
          </IconButton>
        </CustomTooltip>
      </Box>
    </MenuItem>
  );
};

const Sidebar: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:1022px)");
  const [selected, setSelected] = useState<string>("Dashboard");
  const router = useRouter();

  useEffect(() => {
    const currentRoute = router.asPath;
    const currentTitle = routeToTitleMap[currentRoute] || "Dashboard";
    setSelected(currentTitle);
  }, [router]);

  if (isMobile) {
    return null;
  }

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `white !important`,
          width: "240px",
          borderRight: "1px solid #E0E0E0",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          position: "relative",
        },
        "& .pro-menu-item": {
          borderRadius: "6px",
          position: "relative",
          "&::before": {
            borderRadius: "6px",
            content: '""',
            position: "absolute",
            left: 20,
            right: 20,
            top: 3,
            bottom: 3,
            backgroundColor: "transparent",
            zIndex: -1,
            transition: "background-color 0.3s",
          },
          "&:hover::before": {
            backgroundColor: "#e5e5e5", // Cor do hover
            borderRadius: "6px",
          },
          "&.active::before": {
            backgroundColor: "transparent",
          },
          "&:hover": {
            "& .pro-icon-wrapper": {
              color: "black !important",
            },
          },
          "&:hover .pro-inner-item": {
            color: "black !important",
          },
          // "& .pro-menu-item:hover .pro-icon-wrapper": {
          //   animation: "none !important", // Remove animações CSS
          //   transition: "none !important", // Remove transições CSS
          // },
        },
      }}
    >
<ProSidebar style={{ height: '100vh' }}>
        <Menu iconShape="square">
          <Box sx={{ height: "10px" }}></Box>
          <Item
            title="Área de trabalho"
            to="/workspace"
            icon={<FormatListBulletedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Agenda"
            to="/schedule"
            icon={<EventAvailableOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Atendimentos"
            to="/consulting"
            icon={<ChatBubbleOutlineRoundedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Atividades"
            to="/clippings"
            icon={<DescriptionOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Documentos"
            to="/documents"
            icon={<AttachFileOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Clientes"
            to="/clients"
            icon={<PersonAddOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Contatos"
            to="/contacts"
            icon={<PersonOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Processos e casos"
            to="/folders"
            icon={<FolderOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Financeiro"
            to="/financial"
            icon={<AttachMoneyOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Notificações"
            to="/alerts"
            icon={<NotificationsNoneOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Divider style={{ margin: "20px 0" }} />
          <SupportItem selected={selected} setSelected={setSelected} />
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
