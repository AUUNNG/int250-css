<script setup>
import ProfileCard from "./components/ProfileCard.vue";
</script>

<template>
	<div
		class="flex flex-wrap items-center justify-center gap-8 min-h-screen bg-gradient-to-br from bg-green-500 to-sky-400 p-8"
	>
		<ProfileCard
			background="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRdQQmT0Kglw807aUTqYnyyKhkxY1C5cFSg&s"
			profileimg="https://i.redd.it/i-need-help-to-find-the-origin-of-this-dog-v0-vrmcxbq4fq5e1.png?width=341&format=png&auto=webp&s=02342b6fd6b753b6cbb6a2ef4bd92beb46115f83"
			name="Yuttapoom Haphanom"
			subheading="Student, 20, NK"
			followers="10"
			following="500"
			projects="10"
            facebook="https://facebook.com"
            instagram="https://instagram.com"
            linkedin="https://linkedin.com"
		/>

        <ProfileCard
			background="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&w=1000&q=80"
			profileimg="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
			name="Sarah Jenkins"
			subheading="UX Designer, 28, NY"
			followers="12k"
			following="450"
			projects="32"
            facebook="https://facebook.com/sarah"
            instagram="https://instagram.com/sarah"
            linkedin="https://linkedin.com/in/sarah"
		/>

        <ProfileCard
			background="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&w=1000&q=80"
			profileimg="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
			name="Michael Chen"
			subheading="Full Stack Dev, 30, SF"
			followers="8.5k"
			following="120"
			projects="55"
            facebook="https://facebook.com/michael"
            instagram="https://instagram.com/michael"
            linkedin="https://linkedin.com/in/michael"
		/>
	</div>
</template>

<style scoped></style>
