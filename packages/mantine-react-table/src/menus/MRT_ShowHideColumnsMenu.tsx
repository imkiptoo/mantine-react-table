import {useMemo, useState} from 'react';
import {Button, Divider, Flex, Menu} from '@mantine/core';
import {MRT_ShowHideColumnsMenuItems} from './MRT_ShowHideColumnsMenuItems';
import {getDefaultColumnOrderIds} from '../column.utils';
import {type MRT_Column, type MRT_TableInstance} from '../types';

interface Props<TData extends Record<string, any> = {}> {
    isSubMenu?: boolean;
    table: MRT_TableInstance<TData>;
}

export const MRT_ShowHideColumnsMenu = <
    TData extends Record<string, any> = {},
>({
      isSubMenu,
      table,
  }: Props<TData>) => {
    const {
        getAllColumns,
        getAllLeafColumns,
        getCenterLeafColumns,
        getIsAllColumnsVisible,
        getIsSomeColumnsPinned,
        getIsSomeColumnsVisible,
        getLeftLeafColumns,
        getRightLeafColumns,
        getState,
        toggleAllColumnsVisible,
        options: {
            enableColumnOrdering,
            enableHiding,
            enablePinning,
            localization,
        },
    } = table;
    const {columnOrder, columnPinning} = getState();

    const hideAllColumns = () => {
        getAllLeafColumns()
            .filter((col) => col.columnDef.enableHiding !== false)
            .forEach((col) => col.toggleVisibility(false));
    };

    const allColumns = useMemo(() => {
        const columns = getAllColumns();
        if (
            columnOrder.length > 0 &&
            !columns.some((col) => col.columnDef.columnDefType === 'group')
        ) {
            return [
                ...getLeftLeafColumns(),
                ...Array.from(new Set(columnOrder)).map((colId) =>
                    getCenterLeafColumns().find((col) => col?.id === colId),
                ),
                ...getRightLeafColumns(),
            ].filter(Boolean);
        }
        return columns;
    }, [
        columnOrder,
        columnPinning,
        getAllColumns(),
        getCenterLeafColumns(),
        getLeftLeafColumns(),
        getRightLeafColumns(),
    ]) as MRT_Column<TData>[];

    const [hoveredColumn, setHoveredColumn] = useState<MRT_Column<TData> | null>(
        null,
    );

    return (
        <Menu.Dropdown
            sx={{
                maxHeight: 'calc(80vh - 100px)',
                overflowY: 'auto'
            }}
            styles={{
                item: {
                    height: "2rem",
                    padding: ".5rem .75rem .5rem .25rem",
                    fontSize: "0.875rem",

                },
                itemIcon: {
                    height: "1.125rem",
                    width: "1.125rem",
                    marginRight: ".5rem",
                    opacity: 0.75,
                },
                dropdown: {
                    boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -2px",
                    padding: 0,
                    borderColor: "rgb(229, 229, 229)",
                    borderRadius: "6px",
                }
            }}
        >
            <Flex
                sx={{
                    justifyContent: isSubMenu ? 'center' : 'space-between',
                    paddingBottom: '4px',
                    gap: '4px',
                }}
            >
                {!isSubMenu && enableHiding && (
                    <Button
                        disabled={!getIsSomeColumnsVisible()}
                        onClick={hideAllColumns}
                        styles={{
                            root: {
                                height: "1.75rem",
                            }
                        }}
                        variant="subtle"
                    >
                        {localization.hideAll}
                    </Button>
                )}
                {!isSubMenu && enableColumnOrdering && (
                    <Button
                        onClick={() =>
                            table.setColumnOrder(
                                getDefaultColumnOrderIds(table.options as any),
                            )
                        }
                        styles={{
                            root: {
                                height: "1.75rem",
                            }
                        }}
                        variant="subtle"
                    >
                        {localization.resetOrder}
                    </Button>
                )}
                {!isSubMenu && enablePinning && (
                    <Button
                        disabled={!getIsSomeColumnsPinned()}
                        styles={{
                            root: {
                                height: "1.75rem",
                            }
                        }}
                        onClick={() => table.resetColumnPinning(true)}
                        variant="subtle"
                    >
                        {localization.unpinAll}
                    </Button>
                )}
                {enableHiding && (
                    <Button
                        styles={{
                            root: {
                                height: "1.75rem",
                            }
                        }}
                        disabled={getIsAllColumnsVisible()}
                        onClick={() => toggleAllColumnsVisible(true)}
                        variant="subtle"
                    >
                        {localization.showAll}
                    </Button>
                )}
            </Flex>
            <Divider/>
            {allColumns.map((column, index) => (
                <MRT_ShowHideColumnsMenuItems
                    allColumns={allColumns}
                    column={column}
                    hoveredColumn={hoveredColumn}
                    isSubMenu={isSubMenu}
                    key={`${index}-${column.id}`}
                    setHoveredColumn={setHoveredColumn}
                    table={table}
                />
            ))}
        </Menu.Dropdown>
    );
};
