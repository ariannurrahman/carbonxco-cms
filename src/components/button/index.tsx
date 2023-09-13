import { Button } from 'antd';
import { ReactNode } from 'react';

interface VIPButtonProps {
  children: ReactNode;
  type?: 'primary' | 'link' | 'text' | 'default' | 'dashed' | undefined;
  className?: string;
  onClick?: () => void;
  htmlType?: 'submit' | 'button' | 'reset' | undefined;
  size?: 'small' | 'middle' | 'large' | undefined;
  icon?: ReactNode;
  danger?: boolean;
  disabled?: boolean;
  form?: string;
  loading?: boolean;
}

export const VIPButton = (props: VIPButtonProps) => {
  const {
    danger = false,
    disabled = false,
    size = 'large',
    children,
    type = 'primary',
    className,
    onClick,
    htmlType = 'button',
    icon,
    loading,
  } = props;
  return (
    <Button
      {...props}
      loading={loading}
      danger={danger}
      disabled={disabled}
      icon={icon}
      size={size}
      className={`${type === 'primary' ? 'bg-[#1677ff]' : ''}  ${className}`}
      type={type}
      onClick={onClick}
      htmlType={htmlType}
    >
      {children}
    </Button>
  );
};
