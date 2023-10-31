import { enqueueSnackbar, VariantType } from 'notistack';

const notify = (message: string, variant: VariantType = 'success') =>
	enqueueSnackbar(message, {
		variant
	});

export default notify;
