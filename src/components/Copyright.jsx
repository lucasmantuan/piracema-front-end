
import { Link, Typography } from "@mui/material";

export const Copyright = () => {
    return (
        <Typography
            variant="caption"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis">
            Copyright &#169;
            <Link
                target="_blank"
                underline="none"
                href="http://www.lucasmantuan.com.br/"
                paddingX={0.5}>
                Lucas Mantuan
            </Link >
            <Link
                target="_blank"
                underline="none"
                href="http://www.lucasmantuan.com.br/"
                paddingX={0.5}>
                Walter Beinar
            </Link >
            <Link
                target="_blank"
                underline="none"
                href="http://www.lucasmantuan.com.br/"
                paddingX={0.5}>
                Jhoan Perez
            </Link >
            {new Date().getFullYear()}
        </Typography >
    );
};
