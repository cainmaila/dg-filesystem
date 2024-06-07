export const load = async ({ params }) => {
	return { _id: params._id, parent: params._parent }
}
