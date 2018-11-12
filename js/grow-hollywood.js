function getModalBody(type) {
    var modalBody = '<input type="hidden" id="inputHiddenFormType" value="' + type + '"/>';

    switch(type) {
        case 'app':
        case 'game':
            modalBody += 'Developer or Creator';
            break;
        case 'other':
            modalBody += 'Creator';
            break;
        case 'script':
        default:
            modalBody += 'Writer';
            break;
    }

    modalBody += ' agrees that in submitting material:<br/><br/>'
               + '1. Developer or creator warrants that submitted application description ("Material") are original and that Developer or creator has the right to grant all rights in and to such material. In the event the Material, in whole or in part, is not original to Developer or creator, Developer or creator nonetheless represents that he/she has the exclusive right to grant all rights in and to the Material.<br/><br/>'
               + '2. Developer or creator agrees to indemnify Grow Hollywood, LLC and its successors, assigns and affiliated and related entities (each an "Indemnified Party") from and against any and all claims, expenses, damages, actions, causes of action, losses or liability (including reasonable attorneys\' fees and costs) that may be asserted against, imposed on or incurred by any Indemnified Party at any time in connection with the Material.<br/><br/>'
               + '3. If Grow Hollywood, LLC determines in its sole discretion that the Material doesn\'t meet its criteria, it is not obligated to produce any motion picture or portion thereof based on such Material.<br/><br/>'
               + '4. Developer or creator understands that Grow Hollywood, LLC and its affiliates receive numerous submissions of ideas formats, suggestions and other materials from other Developer or creator and third parties and that many such submissions might be similar or identical to those submitted by the Developer or creator. Developer or creator agrees that he/she will not be entitled to any compensation or other such consideration as a result of any use by Grow Hollywood, LLC, its successors, assigns and affiliated and related entities of any such similar or identical submissions.<br/><br/>'
               + '5. Developer or creator agrees that Grow Hollywood, LLC is under no obligation to return submitted materials to Developer or creator and Developer or creator agrees to release Grow Hollywood, LLC from any liability for loss or other damage to the copy(ies) submitted.<br/><br/>'
               + '6. Developer or creator accepts the foregoing conditions in return for Grow Hollywood, LLC agreement to consider and review the Material submitted herewith, with the express understanding that Developer or creator agrees to limit it\'s claim of rights in the features of the Material as specifically synopsized in writing or as attached hereto. Developer or creator agrees that Grow Hollywood, LLC has no obligation to Developer or creator with respect to the Material except as set forth in this agreement.<br/><br/>'
               + 'I hereby state that I have read and understand this Agreement, that no oral representations of any kind have been made to me, that there are no prior or contemporaneous oral agreements in effect between Grow Hollywood, LLC and myself pertaining to the Material, and that this agreement states our entire understanding.';

    return modalBody;
}

function clearForm(form) {
    form.find('input[type!="checkbox"], textarea, select').each(function() {
        $(this).val('');
    });

    form.find('textarea').each(function() {
        $(this).val('');
    });

    form.find('textarea').each(function() {
        $(this).val('');
    });

    form.find('input[type="checkbox"]').each(function() {
        $(this).prop('checked', false);
    });

    form.find('input[type="file"]').each(function() {
        $(this).parent('div').find('label').html('<i class="fa fa-file-o"></i>Choose a file to upload');
        $(this).parent('div').find('div.file').html('').addClass('hidden');
    });

    $('.modal-body').html('');
    $('.modal-body #inputHiddenFormType').val('');
}

$(function () {
    $('select#submissionType').change(function() {
        var that        = $(this);
        var submission  = $('div.form.submission');

        $('div.fleeting').remove();

        if (that.val() !== null && that.val() != '')
        {
            submission.removeClass('hidden');

            that.parent('div').find('div.ban').css('color', '#FFF').css('background-color', '#D43F3A');

            $.post('/ajax/form/' + that.val()).success(function(html) {
                $('div#contact').before(html);
            });

            $.post('/ajax/contact/' + that.val()).success(function(html) {
                $('div#row-email').after(html);
            });
        }
        else {
            submission.addClass('hidden');

            clearForm(submission);
        }
    });

    $('div.ban').click(function() {
        var that = $(this);

        that.parent('div').find('select').first().val('').change();
        that.css('color', '#555').css('background-color', '#EEE');
    });

    $('input[type="file"]').change(function(e) {
        e.preventDefault();

        var that            = $(this);
        var fileButton      = that.parent('div').find('label');
        var fileContainer   = that.parent('div').find('div.file');

        var fileName = that.val().split('/').pop().split('\\').pop();

        fileContainer.html(fileName);
        if (that.val() != '')
        {
            fileButton.html('<i class="fa fa-file-o"></i>Change file');
            fileContainer.removeClass('hidden');
        }
        else
        {
            fileButton.html('<i class="fa fa-file-o"></i>Choose a file to upload');
            fileContainer.addClass('hidden');
        }
    });

    $('.open-termsAndConditions').click(function () {
        var type = $('input#formType').val();

        $('.modal-body').html(getModalBody(type));
    });

    $('.btn-modal').click(function()
    {
        var checkbox = $('input#terms');

        if ($(this).data('accept'))
            checkbox.prop('checked', true);
        checkbox.change();
    });

    $('form.mail').on('submit', function (e) {
        e.preventDefault();

        var that    = $(this);
        var type    = that.data('type');
        var btn     = that.find('button[type="submit"]');

        console.log(btn.hasClass('disabled'));

        if (!btn.hasClass('disabled'))
        {
            $.post('/ajax/mail/form/' + type, that.serialize()).success(function(jsonResponse) {
                var data = JSON.parse(jsonResponse);

                switch (data.status)
                {
                    case 'success':
                        $.growl.notice(data);
                        break;
                    case 'error':
                        $.growl.error(data);
                        break;
                }
            });
        }
    });
});
