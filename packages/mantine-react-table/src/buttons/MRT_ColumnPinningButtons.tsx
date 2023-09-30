import { ActionIcon, Flex, Tooltip } from '@mantine/core';
import { type MRT_Column, type MRT_TableInstance } from '../types';
import {Icon} from "@iconify/react";

interface Props<TData extends Record<string, any> = {}> {
  column: MRT_Column<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_ColumnPinningButtons = <
  TData extends Record<string, any> = {},
>({
  column,
  table,
}: Props<TData>) => {
  const {
    options: {
      localization,
    },
  } = table;

  const handlePinColumn = (pinDirection: 'left' | 'right' | false) => {
    column.pin(pinDirection);
  };

  return (
    <Flex
      sx={{
        minWidth: '70px',
        alignContent: 'center',
        justifyContent: 'center',
      }}
    >
      {column.getIsPinned() ? (
        <Tooltip withinPortal label={localization.unpin}>
          <ActionIcon onClick={() => handlePinColumn(false)} size="md">
            <Icon icon="fluent:pin-off-24-regular" height={24} />
          </ActionIcon>
        </Tooltip>
      ) : (
        <>
          <Tooltip withinPortal label={localization.pinToLeft}>
            <ActionIcon onClick={() => handlePinColumn('left')} size="md">
              <Icon icon="fluent:panel-left-contract-24-regular" height={24} />
            </ActionIcon>
          </Tooltip>
          <Tooltip withinPortal label={localization.pinToRight}>
            <ActionIcon onClick={() => handlePinColumn('right')} size="md">
              <Icon icon="fluent:panel-left-expand-24-regular" height={24} />
            </ActionIcon>
          </Tooltip>
        </>
      )}
    </Flex>
  );
};
