import { Dialog, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import CustomButton from 'src/components/buttons/Buttons';
import { useTranslation } from 'react-i18next';

export const CustomDialogButton = ({
        isOpen,
        handleClose,
        title,
        subtitle,
        children
}) => {
        const { t } = useTranslation();
        return (
                <>
                        <Dialog
                                fullWidth
                                maxWidth
                                open={isOpen}
                                onClose={handleClose}
                                area-labellebdy="responsive-dialog-title"
                        >
                                <DialogTitle id="responsive-dialog-title">
                                        {title}
                                </DialogTitle>
                                <DialogTitle id="responsive-dialog-subtitle">
                                        {subtitle}
                                </DialogTitle>
                                <DialogContent>
                                        <DialogContentText id="alert-dialog-description">
                                                {children}
                                        </DialogContentText>
                                </DialogContent>
                                <CustomButton onClick={handleClose}>{t("cancel")}</CustomButton>
                                <CustomButton onClick={handleClose}>{t("reject")}</CustomButton>
                        </Dialog>
                </>
        )
}