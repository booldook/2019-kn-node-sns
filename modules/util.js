const alertLoc = (error, loc) => {
	return `<script>
		alert('${error}');
		location.href = "${loc}";
	</script>`;
}

module.exports = {
	alertLoc
}