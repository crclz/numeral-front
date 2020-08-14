<script>
export default {
  ok: function (that, message) {
    that.$message({
      message: message,
      type: "success",
    });
  },
  err: function (that, errObj) {
    that.$message({
      message: errObj.response.data.message,
      type: "error",
    });
  },
};
</script>