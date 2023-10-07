<template>
  <div class="configure notification">
    <div class="field">
      <label for="projectName" class="label">Project Name</label>
      <div class="control expanded">
        <input
            type="text"
            name="projectName"
            id="projectName"
            class="input"
            v-model="projectName"
            placeholder="project-name"
        />
      </div>
    </div>

    <FolderOpen
        propLabel="Project Folder"
        :propModel="projectFolder"
        :propMutate="setProjectFolder"
        :openMethod="openProjectFolder"
        :keyEnterMethod="openProjectFolder"
        :staticText="projectName"
    />

    <div class="field">
      <label for="idf-board" class="label">Select Profile</label>
      <div class="control">
        <div class="select">
          <select name="idf-board" id="idf-board" v-model="selectedBoard">
            <option value="XSMP-SDK">XSMP-SDK</option>
            <option value="ESA-SDK">ESA-SDK</option>
          </select>
        </div>
      </div>
    </div>

    <div class="field">
      <label for="tools" class="label">Select Tools</label>
      <div class="select is-multiple">
        <select multiple size="2">
          <option value="SMP">SMP</option>
          <option value="Python">Python</option>
        </select>
      </div>
    </div>

    <div class="field install-btn">
      <div class="control">
        <button class="button is-info">Create Project</button>
      </div>
    </div>
  </div>
</template>

<script>
import FolderOpen from "@/components/FolderOpen.vue";

export default {
  components: {
    FolderOpen,
  },
  data() {
    return {
      projectName: "",
      projectFolder: "",
    };
  },
};
</script>

<style lang="scss">
.centerize {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.configure {
  display: flex;
  flex-direction: column;
  margin: 1%;
}

.expanded {
  width: 70%;
  align-items: center;
  display: flex;
  justify-content: center;
}

.install-btn {
  margin: 0.5em;
  align-self: flex-end;
}
.notification span {
  font-weight: bold;
}
</style>
