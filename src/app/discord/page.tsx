import {redirect} from 'next/navigation';

export default function Page() {
	return redirect(process.env.DISOCRD_INVITE_LINK!);
}
