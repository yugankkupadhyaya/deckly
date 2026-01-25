import React, { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import { Button } from '../../ui/button';

type Props = {
  children: React.ReactNode;
  className?: string;
  description: ReactNode;
  loading?: boolean;
  onclick?: () => void;
  open: boolean;
  handleOpen: () => void;
};

const AlertDialogBox = ({
  children,
  className,
  description,
  loading = false,
  onclick,
  open,
  handleOpen,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button variant="destructive" className={className} onClick={onclick} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              'Continue'
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
