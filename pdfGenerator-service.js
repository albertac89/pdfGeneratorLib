(function () {
    'use strict';
    angular.module('App.pdfGenerator')
    /**
     * @ngdoc service
     * @name App.pdfGenerator.service:pdfGeneratorFactory
     * @description
     * Tools to generate a pdf
     * @requires $log
     * @requires $filter
     */
        .factory('pdfGeneratorFactory',
            function (timeZoneutfOffset, $log, $filter) {

                $log.debug('pdfGeneratorFactory loading');

                var factory = {};

                var margin = 40;

                var marginFromTitle = 40;

                var lineHeight = 15;

                var tableFooterLineHeight = 11;

                var titleHeightP = 95;

                var titleHeightL = 65;

                var fontSizeTitle = 15;

                var fontSizeTableTitle = 11;

                var fontSizeTableFooter = 9;

                var fontSizeText = 10;

                var autotableOptions = {
                    margin: {top: 80},
                    afterPageContent: {},
                    styles: {
                        cellPadding: 7,
                        columnWidth: 'auto', // 'auto', 'wrap' or a number
                        fillStyle: 'DF', // 'S', 'F' or 'DF' (stroke, fill or fill then stroke)
                        fontSize: 8,
                        lineColor: 177,
                        lineWidth: 1,
                        fontStyle: 'normal', // normal, bold, italic, bolditalic,
                        overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
                        rowHeight: 20,
                        textColor: 0
                    },
                    alternateRowStyles: {
                        fillColor: 246
                    },
                    headerStyles: {
                        cellPadding: 13,
                        fillColor: 212,
                        fontSize: 9,
                        halign: 'center', // left, center, right
                        textColor: 0,
                        valign: 'middle' // top, middle, bottom
                    },
                    columnStyles: {},
                    createdCell: function (cell) {
                        if (cell.styles.filter) {
                            var split = cell.styles.filter.split(':');
                            if(split.length === 2){
                                cell.text = $filter(split[0])(cell.text,split[1]);
                            } else {
                                cell.text = $filter(cell.styles.filter)(cell.text);
                            }
                        }
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getAutotableOptions
                 * @description
                 * Returns the default autotableOptions.
                 * @returns {Object} The default autotableOptions.
                 */
                factory.getAutotableOptions = function () {
                    return autotableOptions;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getDefaultLineHeight
                 * @description
                 * Returns the default lineHeight.
                 * @returns {int} The default lineHeight.
                 */
                factory.getDefaultLineHeight = function () {
                    return lineHeight;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getTableFooterLineHeight
                 * @description
                 * Returns the default tableFooterLineHeight.
                 * @returns {int} The default tableFooterLineHeight.
                 */
                factory.getTableFooterLineHeight = function () {
                    return tableFooterLineHeight;
                };


                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getDefaultTitleHeight
                 * @description
                 * Returns the default titleHeight.
                 * @param {object} doc The jspdf instance.
                 * @returns {int} The default titleHeight.
                 */
                factory.getDefaultTitleHeight = function (doc) {
                    if (doc.internal.pageSize.width > doc.internal.pageSize.height) {
                        //Landscape
                        return titleHeightL;
                    } else {
                        //Portrait
                        return titleHeightP;
                    }
                };


                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getDefaultStartY
                 * @description
                 * Returns the default startY.
                 * @param {object} doc The jspdf instance.
                 * @returns {int} The default startY.
                 */
                factory.getDefaultStartY = function (doc) {
                    if (doc.internal.pageSize.width > doc.internal.pageSize.height) {
                        //Landscape
                        return marginFromTitle + titleHeightL;
                    } else {
                        //Portrait
                        return marginFromTitle + titleHeightP;
                    }
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getDefaultMargin
                 * @description
                 * Returns the default margin.
                 * @returns {int} The default margin.
                 */
                factory.getDefaultMargin = function () {
                    return margin;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getFontSizeTitle
                 * @description
                 * Returns the default fontSizeTitle.
                 * @returns {int} The default fontSizeTitle.
                 */
                factory.getFontSizeTitle = function () {
                    return fontSizeTitle;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getFontSizeTableTitle
                 * @description
                 * Returns the default fontSizeTableTitle.
                 * @returns {int} The default fontSizeTableTitle.
                 */
                factory.getFontSizeTableTitle = function () {
                    return fontSizeTableTitle;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getFontSizeTableFooter
                 * @description
                 * Returns the default fontSizeTableFooter.
                 * @returns {int} The default fontSizeTableFooter.
                 */
                factory.getFontSizeTableFooter = function () {
                    return fontSizeTableFooter;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getFontSizeText
                 * @description
                 * Returns the default fontSizeText.
                 * @returns {int} The default fontSizeText.
                 */
                factory.getFontSizeText = function () {
                    return fontSizeText;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name imageToBase64
                 * @description
                 * Converts an image to base64
                 * @param {string} imgSrc The src of the image.
                 * @param {string} type The type of the image.
                 * @param {function} callback The callback function.
                 */
                factory.imageToBase64 = function (imgSrc, type, callback) {
                    var canvas = document.createElement('canvas');
                    var image = new Image();
                    var ctx = canvas.getContext('2d');
                    var dataURL;
                    image.crossOrigin = 'Anonymous';
                    image.onload = function () {
                        canvas.height = image.height;
                        canvas.width = image.width;
                        ctx.drawImage(image, 0, 0);
                        //Punto critico
                        dataURL = canvas.toDataURL('image/' + type);
                        //Limpiar canvas
                        canvas = null;
                        callback(dataURL);
                    };
                    //Origen de la imagen
                    image.src = imgSrc;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getXOffset
                 * @description
                 * Returns de xOffset to aling a text
                 * @param {object} doc The object to print a pdf.
                 * @param {string} text The text to align.
                 * @param {string} align The alignment type.
                 * @returns {int} xOffset The xOffset to align the text.
                 */
                factory.getXOffset = function (doc, text, align) {
                    var xOffset = 0;
                    switch (align) {
                        case 'center':
                            xOffset = doc.internal.pageSize.width / 2 - doc.getStringUnitWidth(text) * doc.internal.getFontSize() / 2;
                            break;
                        case 'right':
                            xOffset = doc.internal.pageSize.width - doc.getStringUnitWidth(text) * doc.internal.getFontSize();
                            break;
                        default:
                            break;
                    }
                    return xOffset;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name setColumnsStyles
                 * @description
                 * Creates the columnStyles for a table depending on the columns of the grid
                 * @param {object} autotableOptions The options of the table.
                 * @param {object} columns The columns to style.
                 * @returns {object} autotableOptions The autotableOptions with the styled columns
                 */
                factory.setColumnsStyles = function (autotableOptions, columns) {
                    //Reset columnStyles
                    autotableOptions.columnStyles = {};
                    angular.forEach(columns, function (column) {
                        autotableOptions.columnStyles[column.key] = {
                            halign: column.halign ? column.halign.split('-')[1] : 'left',
                            filter: column.filter
                        };
                    });
                    return autotableOptions;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name generatePdfColumns
                 * @description
                 * Creates an array with the columns that will be shown in the pdf.
                 * @param {object} columnDefs The columnDefs of gridOptions of the uigrid.
                 * @returns {object} columns The columns with all the necessary data.
                 */
                factory.generatePdfColumns = function (columnDefs) {
                    var columns = [];
                    angular.forEach(columnDefs, function (column) {
                        if (column.field !== undefined && column.displayName !== undefined && column.displayName !== '') {
                            columns.push({
                                title: $filter('translate')(column.displayName),
                                key: column.field,
                                // filter: column.cellFilter ? column.cellFilter.split(':')[0] : '',
                                filter: column.cellFilter ? column.cellFilter : '',
                                halign: column.cellClass ? column.cellClass : 'text-left'
                            });
                        }
                    });
                    return columns;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name getMaxLenght
                 * @description
                 * Search the longest text in an array with the format [{'text':'some text'}]
                 * @param {object} textFilters The array to search the longest text.
                 * @param {int} maxLenghtText The current length if you what to compare more than one array.
                 * @param {object} doc The jspd doc object.
                 * @returns {int} maxLenghtText The length of the longest text in the array.
                 */
                factory.getMaxLenght = function (arrayText, maxLenghtText, doc) {
                    angular.forEach(arrayText, function (row) {
                        if (maxLenghtText < doc.getStringUnitWidth(row.text) * doc.internal.getFontSize()) {
                            maxLenghtText = doc.getStringUnitWidth(row.text) * doc.internal.getFontSize();
                        }
                    });
                    return maxLenghtText;
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name autobreakText
                 * @description
                 * Breaks a line of text in multiple lines if needed
                 * @param {string} text The text to break into.
                 * @param {int} startX The X position.
                 * @param {object} doc The jspd doc object.
                 * @returns {array} The array of lines.
                 */
                factory.autobreakText = function(text, startX, doc) {
                    return doc.splitTextToSize(text, doc.internal.pageSize.width - startX - margin);
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name putTextAutoPageBreak
                 * @description
                 * Write the text on the pdf and adds a new page if there isn't more page to write.
                 * It only adds one page so it will work with a max height of lines of to pages.
                 * Use it when you think that the text can be moved to the next page.
                 * @param {string} text The array of text.
                 * @param {int} startY The y position for the text.
                 * @param {int} lineHeight The line height.
                 * @param {int} maxLenghtText The longest text on the array.
                 * @param {object} doc The jspd doc object.
                 * @param {function} header The header function that puts the header image.
                 */
                factory.putTextAutoPageBreak = function (text, startY, lineHeight, maxLenghtText, doc, header) {
                    var newPage = false;
                    var prevPageIndex;
                    angular.forEach(text, function (row, index) {
                        if (!newPage) {
                            if (doc.internal.pageSize.height - margin > doc.autoTableEndPosY() + lineHeight * (index + 1)) {
                                doc.text(row.text, margin, doc.autoTableEndPosY() + lineHeight * (index + 1));
                                doc.text(row.value, margin + maxLenghtText, doc.autoTableEndPosY() + lineHeight * (index + 1));
                            } else {
                                //Add new page
                                newPage = true;
                                prevPageIndex = index;
                                doc.addPage();
                                header();
                                doc.text(row.text, margin, startY + lineHeight * (index - prevPageIndex));
                                doc.text(row.value, margin + maxLenghtText, startY + lineHeight * (index - prevPageIndex));
                            }
                        } else {
                            //Add text to the new page
                            doc.text(row.text, margin, startY + lineHeight * (index - prevPageIndex));
                            doc.text(row.value, margin + maxLenghtText, startY + lineHeight * (index - prevPageIndex));
                        }
                    });
                };

                /**
                 * @ngdoc method
                 * @methodOf App.pdfGenerator.service:pdfGeneratorFactory
                 * @name generatePDFName
                 * @description
                 * Generates a pdf name based on a document title and the current date and time (with a predefined utf offSet)
                 * @param {string} title The base document title.
                 */
                factory.generatePDFName = function (title) {
                    //Parse the title from: 'lorem ipsum sit amet' to 'LoremIpsumSitAmet'
                    var parsedTitle = _.upperFirst(_.camelCase(title));
                    //Get the current date and time with a predefined offset Example  '30 09 2016 031204'
                    var stringDate = moment().utcOffset(timeZoneutfOffset).format('DD MM YYYY HHmmss');

                    return parsedTitle + '_' +_.snakeCase(stringDate) + '.pdf';
                };

                return factory;
            });
}());
