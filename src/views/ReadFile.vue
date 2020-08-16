<template>
  <div v-if="ret" class="center-wrapper">
    <div v-if="!userPermissions.document.canRead">
      <h1>对不起，您没有该文档的阅读权限。</h1>
      <h1>Sorry, but you have no permission to read this document.</h1>
    </div>
    <div v-else>
      <div>
        <div
          v-if="dirty.lockOwner"
          style="background-color: coral; color: white"
        >请注意，该文档正在被{{this.dirty.lockOwner.username}}编辑，您看到的可能不是该文档的最新版本。</div>
        <div
          v-if="dirty.isDirty && !dirty.lockOwner"
          style="background-color: #42b983; color: white"
        >请注意，{{this.dirty.lastModifierName}}已于{{this.dirty.updatedAt | moment}}提交了该文档的最新版本，刷新页面以获得最新版本内容。</div>

        <div class="text-center">
          <div class="title-and-creator">
            <h1 class="doc-title">{{currentFile.title}}</h1>

            <span>by</span>
            <!-- <el-avatar class="creator-avatar" v-if="creator" :size="45" :src="creator.avatarUrl"></el-avatar> -->
            <el-link
              class="creator-link"
              v-if="creator"
              @click="jmp('/getUser/'+creator.id)"
            >{{creator.username}}</el-link>
          </div>

          <el-popover placement="bottom" width="400" trigger="click">
            <share :share-url="shareUrl"></share>
          </el-popover>
        </div>

        <div v-if="currentFile" class="doc-info">
          <img
            class="info-badge"
            :src="`https://badgen.net/badge/创建时间/${moment(currentFile.createdAt)}/cyan`"
          />
          <img
            class="info-badge"
            :src="`https://badgen.net/badge/上次更新/${moment(currentFile.updatedAt)}/yellow`"
          />

          <img
            class="info-badge"
            :src="`https://badgen.net/badge/编辑次数/${currentFile.modifyCount}/red`"
          />
          <!-- 创建时间：{{currentFile.createdAt | moment}} |
          编辑次数：{{currentFile.modifyCount}} |
          上次更新时间：{{currentFile.updatedAt | moment}} |-->
        </div>

        <div class="doc-actions">
          <!-- 编辑按钮 -->
          <el-button
            @click="jmp('/editFile/'+documentId)"
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <!-- 收藏按钮 -->
          <el-button type="warning" :icon="favorite.favoriteIcon" @click="favoriteFile" circle></el-button>

          <el-button
            slot="reference"
            type="success"
            :disabled="!userPermissions.document.canShare"
          >分享文档</el-button>

          <el-button @click="jmp('/createFile/'+documentId)" type="primary">基于此模板</el-button>
          <el-button @click="jmp('/docmange/'+documentId)" type="primary">管理</el-button>
        </div>

        <div></div>
        <div></div>

        <el-popover
          placement="right"
          width="400"
          trigger="click"
          v-if="this.global.me.id==this.document.creatorId"
        >
          <team-list
            :teamList="this.teamList"
            :document="this.document"
            :isMycreated="false"
            :isMoveDoc="true"
            :userId="this.global.me.id"
            @get-teamlist="loadTeamlist"
          ></team-list>
          <el-button slot="reference" type="warning">{{this.teamName}}</el-button>
        </el-popover>
        <el-button
          @click="deletefromteam(document)"
          type="danger"
          v-if="(this.document.teamId!=null)&&((this.global.me.id==this.document.creatorId)||(this.global.me.id==this.currentTeam.leaderId))"
        >移出团队</el-button>
        <!-- 当前文档所在团队名，点击可移动文档至团队 -->
        <HR style="margin-top:2.5rem; margin-bottom:2.5rem;" />

        <!-- 正文 -->
        <h1 class="text-center">文档内容</h1>

        <div id="doc-content" class="flex-center">
          <div v-html="currentFile.data"></div>
        </div>

        <div id="comment-big-box">
          <h1 class="text-center">评论列表</h1>
          <div id="comment-list-box">
            <!-- TODO refresh?? -->
            <div :key="refreshCommentKey">
              <div v-for="item in comments" :key="item.id">
                <div class="comment-each">
                  <div class="comment-avatar">
                    <el-avatar :size="45" :src="item.user.avatarUrl"></el-avatar>
                  </div>
                  <div class="comment-username-and-content">
                    <div class="comment-username">{{item.user.username}}</div>

                    <div class="comment-content">
                      <div class="grid-content" v-html="item.content"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <HR />
        <create-comment ref="createComment" :documentId="documentId" @submit-comment="loadComments"></create-comment>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CreateComment from "../components/CreateComment";
import Share from "../components/Share";
import TeamList from "@/components/TeamList.vue";

export default {
  name: "ReadFile",
  components: {
    Share,
    CreateComment,
    TeamList,
  },
  created() {
    this.documentId = this.$route.params.id;

    //先检查文档阅读权限
    axios
      .get("/api/documents/permission/" + this.documentId)
      .then((response) => {
        console.log(response);
        this.userPermissions.ref = response.data;

        // 解析权限
        //      文档读写
        if (this.userPermissions.ref.documentAccess == "ReadWrite") {
          this.userPermissions.document.canWrite = true;
          this.userPermissions.document.canRead = true;
        } else if (this.userPermissions.ref.documentAccess == "Read") {
          this.userPermissions.document.canRead = true;
        }
        //      文档分享
        if (this.userPermissions.ref.canShare) {
          this.userPermissions.document.canShare = true;
        }
        //      评论读写
        if (this.userPermissions.ref.commentAccess == "ReadWrite") {
          this.userPermissions.comment.canWrite = true;
          this.userPermissions.comment.canRead = true;
        } else if (this.userPermissions.ref.commentAccess == "Read") {
          this.userPermissions.comment.canRead = true;
        }

        // 有权限读
        if (this.userPermissions.document.canRead) {
          axios
            .get("/api/documents/" + this.documentId)
            .then((response) => {
              console.log(response);
              this.currentFile = response.data;

              axios
                .get("/api/users/" + this.currentFile.creatorId)
                .then((res) => {
                  this.creator = res.data;
                })
                .catch((p) => this.err(p));
            })
            .catch(function (error) {
              console.log(error);
            });
          this.checkFavorite(); // 检查是否收藏过，如果收藏过则显示已收藏
          this.loadComments(); // 加载评论
          this.shareUrl = window.location.href;
          this.ret = true;

          // 计数器，获取该文档的写状态
          this.timer = setInterval(() => {
            // this.testCount=this.testCount+1;
            // alert("hello");
            axios
              .get("/api/e-lock/get-owner?documentId=" + this.documentId)
              .then((response) => {
                console.log(response);
                this.dirty.lockOwner = response.data;
                if (this.dirty.lockOwner) {
                  // 写锁有主
                  this.dirty.isDirty = true;
                  this.dirty.lastModifierName = this.dirty.lockOwner.username;
                } else {
                  // 写锁有主
                  if (this.dirty.isDirty) {
                    // 已脏
                    axios
                      .get("/api/documents/" + this.documentId)
                      .then((response) => {
                        // window.console.log(response.data.length);
                        console.log(response);
                        this.dirty.updatedAt = response.data.updatedAt;

                        // alert("请求成功")
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }
                }
              })
              .catch((error) => {
                console.log(error);
                this.err("获取写锁失败");
              });
          }, 1000);
        }
        this.ret = true;
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("/api/memberships", { params: { userId: this.global.me.id } })
      .then((response) => {
        this.teamList = response.data;
      })
      .catch((error) => {
        console.log(error);
        this.err(error);
      });
    axios
      .get("/api/documents/" + this.documentId)
      .then((response) => {
        this.document = response.data;
        if (this.document.teamId != null && this.document.teamId != 0) {
          this.$axios
            .get("/api/teams/" + this.document.teamId)
            .then((response) => {
              this.currentTeam = response.data;
              this.teamName = response.data.name;
            })
            .catch((error) => {
              console.log(error);
              this.err(error);
            });
        } else {
          this.teamName = "暂无团队";
        }
      })
      .catch((error) => {
        console.log(error);
        this.err(error);
      });
  },
  destroyed() {
    if (this.timer) clearInterval(this.timer);
  },
  data() {
    return {
      currentTeam: "",
      teamName: "",
      documentId: null,
      document: "",
      teamList: [],
      favorite: {
        favorited: false,
        favoriteId: "",
        favoriteIcon: "el-icon-star-off",
        icons: ["el-icon-star-off", "el-icon-star-on"], // 未收藏 | 已收藏
      },
      currentFile: {},
      comments: [{}],
      shareUrl: "",
      ret: false,
      dirty: {
        isDirty: false,
        lockOwner: null,
        lastModifierName: "",
        updatedAt: 0,
      },
      userPermissions: {
        ref: null,
        document: {
          canRead: false,
          canWrite: false,
          canShare: false,
        },
        comment: {
          canRead: false,
          canWrite: false,
        },
      },
      refreshCommentKey: 0,
      creator: null,
    };
  },
  methods: {
    loadTeamlist() {
      this.teamName = "暂无团队";
      axios
        .get("/api/memberships", { params: { userId: this.global.me.id } })
        .then((response) => {
          this.teamList = response.data;
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
      axios
        .get("/api/documents/" + this.documentId)
        .then((response) => {
          this.document = response.data;
          if (this.document.teamId != null && this.document.teamId != 0) {
            this.$axios
              .get("/api/teams/" + this.document.teamId)
              .then((response) => {
                this.currentTeam = response.data;
                this.teamName = response.data.name;
              })
              .catch((error) => {
                console.log(error);
                this.err(error);
              });
          } else {
            this.teamName = "暂无团队";
          }
        })
        .catch((error) => {
          console.log(error);
          this.err(error);
        });
    },
    deletefromteam(document) {
      this.teamId = -1;
      this.documentId = document.id;
      this.$axios
        .patch("/api/documents/" + this.documentId, {
          teamId: this.teamId,
        })
        .then((response) => {
          this.success("成功将文档移除团队");
          console.log(response.data);
          this.loadTeamlist();
          this.teamName = "暂无团队";
          this.document.teamId = null;
        })
        .catch((p) => this.err(p));
    },
    checkFavorite() {
      axios
        .get("/api/favorites/find-by-documentId/?documentId=" + this.documentId)
        .then((response) => {
          console.log(response);
          if (response.data == "") {
            // alert("123444336");
            this.favorite.favorited = false;
            this.favorite.favoriteIcon = this.favorite.icons[0];
          } else {
            // 收藏过
            this.favorite.favorited = true;
            this.favorite.favoriteIcon = this.favorite.icons[1];
            this.favorite.favoriteId = response.data.id;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    favoriteFile() {
      // 收藏操作
      if (this.favorite.favorited == false) {
        // 未收藏过，执行收藏
        axios
          .post("/api/favorites?documentId=" + this.currentFile.id)
          .then((response) => {
            console.log(response);
            // 变更状态为已收藏
            this.favorite.favorited = true;
            this.favorite.favoriteIcon = this.favorite.icons[1];
            this.favorite.favoriteId = response.data.id;
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // 已收藏过，取消收藏
        axios
          .delete("/api/favorites/" + this.favorite.favoriteId)
          .then((response) => {
            console.log(response);
            // 变更状态为未收藏
            this.favorite.favorited = false;
            this.favorite.favoriteIcon = this.favorite.icons[0];
            this.favorite.favoriteId = "";
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    loadComments() {
      axios
        .get("/api/comments?documentId=" + this.documentId)
        .then((response) => {
          console.log(response);
          this.comments = response.data;
          // 初始化编辑器
          if (this.$refs.createComment.$refs.thisEditor.editor) {
            this.$refs.createComment.$refs.thisEditor.clearEditor();
          }
          this.refreshCommentKey = this.refreshCommentKey + 1;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // gotoEditFile() {
    //     this.$router.push({path: "/editFile/"+this.documentId})
    // },
  },
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

#doc-content {
  border-style: dashed;
  border-width: 2px;
  border-radius: 30px;
  border-color: #dcdfe6;
  padding: 30px 80px;
  word-break: break-word;
  min-height: 450px;
  background-color: whitesmoke;
}

#comment-big-box {
  margin: 60px 0;
}

#comment-list-box {
  border-style: dashed;
  border-width: 2px;
  border-radius: 15px;
  border-color: #dcdfe6;
  padding: 15px 15px;
}

/* .comment-user-info {
  display: flex;
  align-items: center;
  background-color: lightblue;
  width: fit-content;
  padding: 8px 25px;
  border-radius: 4px;
} */

.comment-username {
  margin-left: 15px;
}

.comment-content {
  background-color: whitesmoke;
  padding: 8px 25px;
  margin-top: 10px;
  border-radius: 6px;
  width: fit-content;
  min-width: 160px;
  margin-left: 15px;
  word-break: break-word;
}

.comment-each {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #dcdfe6;
  padding: 20px 0;
  display: flex;
}

.comment-username-and-content {
  /* flex-shrink: 1; */
}

.title-and-creator {
  display: flex;
  justify-content: center;
  align-items: center;
}

.doc-title {
  margin-right: 30px;
}

.creator-avatar {
  margin-right: 8px;
  margin-left: 8px;
}

.doc-actions {
  margin: 8px 0;
}

.creator-link {
  margin-left: 5px;
}

.info-badge {
  margin: 0 5px;
}
</style>