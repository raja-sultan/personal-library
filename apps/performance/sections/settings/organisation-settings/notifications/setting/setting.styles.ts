export const styles = {
    wrapper: ({ palette }) => ({
        '& .custom_card': {
            '& .MuiTableContainer-root table': {
                '& thead': {
                    display: 'none'
                },
                '& tbody tr td': {
                    borderTop: `1px solid ${palette.neutral[100]}`,
                    borderBottom: `1px solid ${palette.neutral[100]}`,
                    fontSize: '16px',
                    textTransform: 'capitalize'
                },
            }
        },
    })
}