import {ActionIcon, Indicator, Tooltip, useMantineTheme} from '@mantine/core';
import {type MRT_Header, type MRT_TableInstance} from '../types';
import {getPrimaryColor} from '../column.utils';
import {Icon} from "@iconify/react";

interface Props<TData extends Record<string, any> = {}> {
    header: MRT_Header<TData>;
    table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadCellSortLabel = <
    TData extends Record<string, any> = {},
>({
      header,
      table,
  }: Props<TData>) => {
    const {
        getState,
        options: {
            icons: {IconArrowsSort},
            localization,
        },
    } = table;
    const {column} = header;
    const {columnDef} = column;
    const {sorting} = getState();

    const theme = useMantineTheme();

    const sortTooltip = column.getIsSorted()
        ? column.getIsSorted() === 'desc'
            ? localization.sortedByColumnDesc.replace('{column}', columnDef.header)
            : localization.sortedByColumnAsc.replace('{column}', columnDef.header)
        : column.getNextSortingOrder() === 'desc'
            ? localization.sortByColumnDesc.replace('{column}', columnDef.header)
            : localization.sortByColumnAsc.replace('{column}', columnDef.header);

    const showIndicator = sorting.length >= 2 && column.getSortIndex() !== -1;

    const isSorted = column.getIsSorted();

    if(!isSorted){
        return <></>;
    }

    return (
        <Tooltip withinPortal label={sortTooltip}
                 openDelay={0}
                 closeDelay={0}
        >
            <Indicator
                color="transparent"
                disabled={!showIndicator}
                inline
                label={column.getSortIndex() + 1}
                offset={3}
                display={column.getIsSorted() ? "block" : "none"}
            >
                <ActionIcon
                    aria-label={sortTooltip}
                    color={column.getIsSorted() ? getPrimaryColor(theme) : undefined}
                    size="xs"
                    sx={{
                        opacity: column.getIsSorted() ? 1 : 0.5,
                        transform: showIndicator ? 'translate(-2px, 2px) scale(0.9)' : undefined,
                        transition: 'opacity 100ms ease-in-out',
                        '&:hover': {
                            opacity: 1,
                        },
                    }}
                >
                    {column.getIsSorted() === 'desc' ? (
                        <Icon icon="fluent:text-sort-descending-20-filled" height={24} />
                    ) : column.getIsSorted() === 'asc' ? (
                        <Icon icon="fluent:text-sort-ascending-20-filled" height={24} />
                    ) : (
                        <IconArrowsSort/>
                    )}
                </ActionIcon>
            </Indicator>
        </Tooltip>
    );
};
