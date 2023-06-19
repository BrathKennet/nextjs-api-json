const Error = ({texto}) => {
	return (
		<div className='bg-red-600 p-3 mt-3 rounded-xl text-white hover:bg-black border border-red-600 duration-300 text-center font-bold'>
			<p>{texto}</p>
		</div>
	)
}

export default Error