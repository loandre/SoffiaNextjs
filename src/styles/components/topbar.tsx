// import { styled, useTheme, useMediaQuery, Tooltip } from '@mui/material';

// // Estilo personalizado para Tooltips usando o Material-UI 'styled'
// export const CustomTooltip = styled(Tooltip)(({ theme }) => ({
//   [`& .MuiTooltip-tooltip`]: {
//     backgroundColor: theme.palette.background.default,
//     color: theme.palette.text.primary,
//     fontSize: "0.8rem",
//     borderRadius: "4px",
//   },
//   [`& .MuiTooltip-arrow`]: {
//     color: theme.palette.background.default,
//   },
// }));

// export const useTopbarStyles = () => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery('(max-width:766px)');
//   const adjustSearch = useMediaQuery('(max-width:1023px)');

//   return {
//     topbarContainer: {
//       display: "flex",
//       alignItems: "center",
//       p: 1.4,
//       sx: {
//         bgcolor: theme.palette.background.paper,
//         boxShadow: '0 2px 4px rgba(112, 112, 112, 0.1)',
//         zIndex: 1201,
//       },
//     },
//     logoBox: {
//       component: "img",
//       sx: {
//         width: isMobile ? '28px' : '140px',
//         marginLeft: '15px',
//         marginRight: isMobile ? '10px' : '150px',
//         cursor: 'pointer',
//       },
//     },
//     searchBox: {
//       display: "flex",
//       alignItems: "center",
//       sx: {
//         width: adjustSearch ? 'auto' : {
//           xs: '320px',
//           md: `calc(320px + ${(480 - 320) / (1600 - 1050)} * (100vw - 1050px))`,
//           lg: '480px',
//         },
//         height: '40px',
//         border: '1px solid #F3F3F4',
//         borderRadius: '4px',
//         boxShadow: '0 2px 4px rgba(93, 93, 93, 0.1)',
//         '&:focus-within': {
//           borderColor: '#003380',
//           boxShadow: '0 2px 4px rgba(0, 92, 168, 0.5)',
//         },
//         flex: adjustSearch ? 1 : 'none',
//         marginLeft: { xs: '10px', sm: '-90px', md: '-57px', lg: '-50px' },
//         marginRight: adjustSearch ? 1 : 'none',
//         "@media screen and (min-width: 600px) and (max-width: 767px)": {
//           marginLeft: '10px',
//         },
//       },
//     },
//     inputBase: {
//       sx: {
//         ml: 2,
//         flex: 1,
//         height: '100%',
//         color: theme.palette.text.primary,
//       },
//     },
//     userMenuBox: {
//       sx: {
//         ml: 'auto',
//         display: 'flex',
//         alignItems: 'center',
//         cursor: 'pointer',
//       },
//     },
//     // ... Outros estilos específicos do componente Topbar
//   };
// };
