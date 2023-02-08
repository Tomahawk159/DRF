import { useEffect } from "react";
import styles from "./TableFooter.module.css";
import { Button, useColorMode } from "@chakra-ui/react";

export const TableFooter = ({ range, setPage, page, slice }) => {
    useEffect(() => {
        if (slice.length < 1 && page !== 1) {
            setPage(page - 1);
        }
    }, [slice, page, setPage]);

    const { colorMode } = useColorMode()
    return (
        <div className={styles.tableFooter}>
            {range.length !== 1 ?
                range.map((el, index) => (
                    <Button
                        bg={colorMode === 'dark' ? 'teal.600' : 'teal.400'}
                        key={index}
                        className={`${styles.button} ${page === el ? styles.activeButton : styles.inactiveButton
                            }`}
                        onClick={() => setPage(el)}
                    >
                        {el}
                    </Button>
                )) : <div />}
        </div>
    );
};
