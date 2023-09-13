import type { types } from "replugged";

const pluginExports = `window.replugged.plugins.getExports("dev.fedeilleone.EditMessageAttachments")`;

const patches: types.PlaintextPatch[] = [
  {
    // Patch the MessageEditor component
    find: /\.EDIT_TEXTAREA_HELP/,
    replacements: [
      {
        // Render the EditComposerAttachments component
        match: /(\(\)\.operations,children:)((?:[^}]*?}){2}\))/,
        replace: (_, prefix, ogChild) =>
          `${prefix}[${ogChild},${pluginExports}._renderEditComposerAttachments(e)]`,
      },
      {
        // Enable saving if there are new uploads
        match: /(\w\.content!==\w\.props\.message\.content&&(.+?\)))/,
        replace: (_, prefix, ogFn) =>
          `${pluginExports}._checkHasUploads(e.props.channel.id)?${ogFn}:${prefix}`,
      },
      {
        // Enable saving if there are new uploads but content length is 0
        match: /(\.validateEdit;\w{1,3}\()(0===\w.length)/,
        replace: (_, prefix, ogCheck) =>
          `${prefix}!${pluginExports}._checkHasUploads(e.props.channel.id)&&${ogCheck}`,
      },
      {
        // Clear the upload queue when canceling
        match: /(onCancel:function\(\){)/,
        replace: (_, prefix) => `${prefix}${pluginExports}._clearUploads(e.channel.id);`,
      },
    ],
  },
  {
    // Disable the upload a file option
    find: /\.setValue,.{1,3}\.canShowPremiumTutorial/,
    replacements: [
      {
        match: /(isPrivate\(\),\w{1,2}=\(0,.+?\[.+?)(\].+?return )(.+?ATTACH_FILES,(\w).+?)}\)\)/,
        replace: (_, prefix1, prefix2, ogDef, variable) =>
          `${prefix1},${pluginExports}._getEditMessageStore()${prefix2}${pluginExports}._checkIsInEditor(${variable}.id)?false:${ogDef}}))`,
      },
    ],
  },
  {
    // Stop sending attachments "normally" while editing
    find: /\.handleSendMessage/,
    replacements: [
      {
        match: /(case.+?value,\w=)(\w\.uploads)(.+?[\s].+?\w=(\w\.props))/,
        replace: (_, prefix1, ogDef, prefix2, variable) =>
          `${prefix1}${pluginExports}._checkIsInEditor(${variable}.channel?.id)?[]:${ogDef}${prefix2}`,
      },
    ],
  },
  {
    // Upload files while editing
    find: /\.A11Y_ANNOUNCEMENT_MESSAGE_EDITED_FAILED/,
    replacements: [
      {
        match: /((\w)={channelId.+?};)(.+?enqueue\(.+?(\(function.+?(?:[^}]*?}\)){2}))/s,
        replace: (_, prefix1, variable, prefix2, ogFn) =>
          `${prefix1}${pluginExports}._checkHasUploads(${variable}?.channelId)?${pluginExports}._patchEditMessageAction(${variable},${ogFn}):${prefix2}`,
      },
    ],
  },
];

export default patches;
