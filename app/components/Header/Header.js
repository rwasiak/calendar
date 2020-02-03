import React from 'react';
import { css } from 'emotion';
import { Link } from 'react-router-dom';

import CalendarIcon from 'components/svgs/CalendarIcon';
import Button from 'components/Button/Button';
import Cross from 'components/svgs/Cross';
import ZoomControlToggle from 'components/ZoomControlToggle/ZoomControlToggle';

const Header = ({ handleToggleClick, calendarShown }) => {
    return (
        <header
            className={css`
                height: 60px;
                display: flex;
                align-items: center;
                padding-left: 10px;
                border-bottom: 1px solid #ccc;
            `}
        >
            <Link
                to="/"
                title="На главную"
                className={css`
                    flex-grow: 1;
                `}
            ></Link>
            <ZoomControlToggle />
            {handleToggleClick && (
                <Button
                    onClick={handleToggleClick}
                    className={css`
                        padding: 10px 18px;
                    `}
                >
                    {calendarShown ? <Cross /> : <CalendarIcon />}
                </Button>
            )}
        </header>
    );
};
export default Header;