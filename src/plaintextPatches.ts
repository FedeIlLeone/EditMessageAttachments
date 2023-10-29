import type { types } from "replugged";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.EditMessageAttachments")`;

const patches: types.PlaintextPatch[] = [
  {
    // Patch the MessageEditor component
    find: /\.EDIT_TEXTAREA_HELP/,
    replacements: [
      {
        // Render the EditComposerAttachments component
        match: /(\.operations,children:)((?:[^}]*?})\))/,
        replace: (_, prefix, ogChild) =>
          `${prefix}[${ogChild},${pluginExports}._renderEditComposerAttachments(this.props)]`,
      },
      {
        // Enable saving if there are new uploads
        match: /(\w\.content!==this\.props\.message\.content&&(.+?\)))/,
        replace: (_, prefix, ogFn) =>
          `${pluginExports}._checkHasUploads(this.props.channel.id)?${ogFn}:${prefix}`,
      },
      {
        // Enable saving if there are new uploads but content length is 0
        match: /(validateEdit:.{1,50}?)(0===\w.length)/,
        replace: (_, prefix, ogCheck) =>
          `${prefix}!${pluginExports}._checkHasUploads(this.props.channel.id)&&${ogCheck}`,
      },
      {
        // Clear the upload queue when canceling
        match: /(onCancel:\(\)=>)(.+?\))/,
        replace: (_, prefix, ogFn) =>
          `${prefix}{${pluginExports}._clearUploads(this.props.channel.id);${ogFn}}`,
      },
    ],
  },
  {
    // Upload files while editing
    find: /\.A11Y_ANNOUNCEMENT_MESSAGE_EDITED_FAILED/,
    replacements: [
      {
        match: /((\w)={channelId.+?};)(\w+\.default\.enqueue\(.+?(\w+=>(?:[^}]*?}){5}\)})\))/s,
        replace: (_, prefix1, variable, prefix2, ogFn) =>
          `${prefix1}${pluginExports}._checkHasUploads(${variable}?.channelId)?${pluginExports}._patchEditMessageAction(${variable},${ogFn}):${prefix2}`,
      },
    ],
  },
  {
    // Enable pasting files while editing
    find: /renderApplicationCommandIcon:\w+,pendingReply:\w+/,
    replacements: [
      {
        match: /canPasteFiles:(\w+)/,
        replace: (_, variable) =>
          `canPasteFiles:${variable}||${pluginExports}._checkIsInEditor(arguments[0].channel.id)`,
      },
    ],
  },
];

export default patches;
