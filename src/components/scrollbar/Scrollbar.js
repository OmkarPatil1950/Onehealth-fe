import PropTypes from 'prop-types';
import { memo } from 'react';
// @mui
import { Box } from '@mui/material';
//
import { StyledRootScrollbar, StyledScrollbar } from './styles';

// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  sx: PropTypes.object,
  children: PropTypes.node,
};

function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    // <Box sx={{ backgroundColor: 'white', ...sx }}>
    //   <img src='data:image/jpeg;base64,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'
    //    alt='Sample Avatar' style={{ height: '0px' }} />
      <StyledRootScrollbar>
        <StyledScrollbar timeout={500} clickOnTrack={false} sx={sx} {...other}>
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    // </Box>
  );
}

export default memo(Scrollbar);
