import React from 'react';
import PropTypes from 'prop-types';
import { css } from 'emotion';
import { Link, useParams } from 'react-router-dom';
import forEach from 'lodash.foreach';
import ReadingGroup from './ReadingGroup';
import { useTheme } from 'emotion-theming';
import RightIcon from 'components/svgs/RightIcon';

const ReadingsForService = ({ title, readingsForService, brother }) => {
    const rendredReadingGroups = [];
    forEach((value, key) => {
        rendredReadingGroups.push(<ReadingGroup title={String(key)} readingVerses={value} key={String(key)} />);
    }, readingsForService);

    const { date } = useParams();
    const theme = useTheme();

    return (
        <Link to={`/date/${date}/${brother ? 'bReadings' : 'readings'}/${title}`}>
            <div
                className={css`
                    border: 1px solid #d9dde5;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0px 0px 5px 0px #e6e6e8;
                    margin-bottom: 18px;
                    padding: 14px 12px;
                `}
            >
                <h2
                    className={css`
                        text-transform: uppercase;
                        font-size: 14px;
                        font-weight: bold;
                        color: ${theme.colours.primary};
                        margin-bottom: -4px;
                        display: flex;
                    `}
                >
                    <div
                        className={css`
                            flex-grow: 1;
                        `}
                    >
                        {title}
                    </div>

                    <div
                        className={css`
                            margin-top: 3px;
                        `}
                    >
                        <RightIcon />
                    </div>
                </h2>
                {rendredReadingGroups}
            </div>
        </Link>
    );
};
ReadingsForService.propTypes = {
    title: PropTypes.string.isRequired,
    readingsForService: PropTypes.object.isRequired,
};

export default ReadingsForService;
