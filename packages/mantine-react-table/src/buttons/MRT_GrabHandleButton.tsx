import { type DragEventHandler } from 'react';
import { ActionIcon, type ActionIconProps, Tooltip } from '@mantine/core';
import { type HTMLPropsRef, type MRT_TableInstance } from '../types';
import {Icon} from "@iconify/react";

interface Props<TData extends Record<string, any> = {}> {
  actionIconProps?: ActionIconProps & HTMLPropsRef<HTMLButtonElement>;
  onDragStart: DragEventHandler<HTMLButtonElement>;
  onDragEnd: DragEventHandler<HTMLButtonElement>;
  table: MRT_TableInstance<TData>;
}

export const MRT_GrabHandleButton = <TData extends Record<string, any> = {}>({
  actionIconProps,
  onDragEnd,
  onDragStart,
  table,
}: Props<TData>) => {
  const {
    options: {
      localization,
    },
  } = table;

  return (
    <Tooltip
      withinPortal
      openDelay={1000}
      label={actionIconProps?.title ?? localization.move}
    >
      <ActionIcon
        draggable="true"
        size="sm"
        {...actionIconProps}
        onClick={(e) => {
          e.stopPropagation();
          actionIconProps?.onClick?.(e);
        }}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        sx={(theme) => ({
          cursor: 'grab',
          opacity: 0.75,
          padding: '1px',
          transition: 'opacity 100ms ease-in-out',
          '&:hover': {
            backgroundColor: 'transparent',
            opacity: 1,
          },
          '&:active': {
            cursor: 'grabbing',
          },
          ...(actionIconProps?.sx instanceof Function
            ? actionIconProps?.sx(theme)
            : (actionIconProps?.sx as any)),
        })}
        title={undefined}
      >
        <Icon icon="fluent:re-order-dots-vertical-24-regular" height={24} />
      </ActionIcon>
    </Tooltip>
  );
};
