export async function POST(req: Request) {
	const data = await req.json();

	const options = {
		method : 'POST',
		headers: {
			accept        : 'application/json',
			'content-type': 'application/json',
			'api-key'     : process.env.BREVO_API_KEY || ''
		},
		body   : JSON.stringify({
			email         : data.email,
			includeListIds: [2],
			templateId    : 1,
			redirectionUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/subscribed`
		})
	};

	fetch('https://api.brevo.com/v3/contacts/doubleOptinConfirmation', options)
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.error(err));

	return Response.json({});
}


