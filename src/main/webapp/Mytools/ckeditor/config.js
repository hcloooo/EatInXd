/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
    // config.uiColor = '#AADC6E';
    config.toolbar = 'MyToolbar';
    config.language = 'zh-cn';
    config.resize_enabled = false;
    config.toolbar_MyToolbar =
    [
        ['Font', 'FontSize', 'Styles', 'Format', 'TextColor', 'BGColor'],
        ['HorizontalRule', 'Table', '-', "JustifyLeft", "JustifyCenter", "JustifyRight"],
        ['Smiley', 'Image', 'Link', 'Unlink', "Underline"],
        ['SpecialChar', 'PageBreak'],
        ['Maximize', '-'], '/',
        ['Source', 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Scayt'],
        ['Bold', 'Italic', 'Strike'],
        ['Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat'],
        ['NumberedList', 'BulletedList', '-', 'Indent', 'Blockquote'],
        ['Anchor']
    ];
};

