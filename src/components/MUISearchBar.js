import {
    Toolbar,
    Typography,
    OutlinedInput,
    useTheme,
    styled,
  } from '@mui/material';
  
  // ----------------------------------------------------------------------
  
  const RootStyle = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
  }));
  
  const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': { width: 320, boxShadow: theme.shadows[8] },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`,
    },
  }));
  
  export default function MUISearchBar({
    numSelected,
    filterName,
    onFilterName,
  }) {
    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
  
    return (
      <RootStyle
        sx={{
          ...(numSelected > 0 && {
            color: isLight ? 'primary.main' : 'text.primary',
            bgcolor: isLight ? 'primary.lighter' : 'primary.dark',
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography component='div' variant='subtitle1'>
            {numSelected} selected
          </Typography>
        ) : (
          <SearchStyle
            value={filterName}
            onChange={onFilterName}
            placeholder='Filter...'
          />
        )}
      </RootStyle>
    );
  }