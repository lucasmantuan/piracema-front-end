
import { Link, Typography } from "@mui/material";

export const Copyright = () => {
    return (
        <Typography
            variant="caption"
            color="primary"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis">
            Copyright &#169;
            
            <Link
                target="_blank"
                underline="none"
                variant="caption"
                href="http://www.lucasmantuan.com.br/"
                paddingX={0.5}>
                 Lucas Mantuan - Walter Beinar - Jhoan Perez 
            </Link>
            
            {new Date().getFullYear()}
        </Typography>
    );
};
