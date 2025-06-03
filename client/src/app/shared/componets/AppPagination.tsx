import { Box, Pagination } from "@mui/material";

export default function AppPagination() {
  return (
    <Box display='flex' justifyContent='space-between' alignItems='baseline' marginTop={3}>
        <Pagination
                color="secondary"
                size="large"
                count={data.pagination.totalPages}
                page={data.pagination.currentPage}
                />
    </Box>
  )
}