function openModal(modalName: string) {

    var div = document.getElementById(modalName);

    div.style.left = `${((window.outerWidth - parseInt(div.style.width)) / 2)}px`;
    div.style.top = `${((window.outerHeight - parseInt(div.style.height)) / 2)}px`;

    $("body").append('<div id="modal-bg" style="z-index:5"></div>');
    $(`#modal-bg,#${modalName}`).fadeIn("fast");

    $("#modal-bg").click(function () {
        closeModal(modalName);
    });

}
function closeModal(name: string) {
    $(`#${name},#modal-bg`).fadeOut("fast", function () {
        //挿入した<div id="modal-bg"></div>を削除
        $('#modal-bg').remove();
        //graphManager.editMode = GUIEditMode.View;

    });

}