import React, { useContext } from 'react';
import Button from 'components/Button/Button';
import { useDispatch } from 'react-redux';
import { toggleZoomControl } from 'redux/actions/zoom';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { DotsMenuContext } from 'components/DotsMenu/DotsMenu';

const ZoomControlToggle = () => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const { toggleOpen } = useContext(DotsMenuContext);
    return (
        <Button
            title="Изменить шрифт"
            onClick={() => {
                dispatch(toggleZoomControl());
                toggleOpen();
            }}
            className={css`
                padding: 12px !important;
                margin-right: 6px;
                font-size: 16px;
                padding: 6px 6px !important;
                width: 100%;
                text-align: left;
                border-bottom: 1px solid #ccc;
            `}
        >
            <span
                className={css`
                    color: ${theme.colours.gray};
                    display: inline-block;
                    width: 20px;
                `}
            >
                Aa
            </span>{' '}
            <span
                className={css`
                    font-size: 13px;
                `}
            >
                Изменить шрифт
            </span>
        </Button>
    );
};
export default ZoomControlToggle;
