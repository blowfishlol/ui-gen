OLD_Description Documentation
A description file is required for the UI Generator. The description file is in JSON format.
  Structure: It consists of an Array of “page”. Inside the page, there are several attributes that are required to work:
    1. pagename:
      a. Type: String
      b. The value will be taken to give each page its titles.
      c. Example:
        i.  "pagename": "Initialize"
        ii. "pagename": "Options"
    2. rendered:
      a. Type: String
      b. The value will be taken to check if the page should be rendered or not. After the value enters the program, it will check the input then returns the value of true or false, or throw an error if the format is not fulfilled.
      c. The format is [value]&lt;space&gt;[condition]&lt;space&gt;[value]&lt;space&gt;&lt;logic gate&gt;… Where value is the the variable to compare. Acceptable values are:
        i.   the path of an object stated in path in config (refer to …)
        ii.  Object path with .length (path.length) to get the length of string in the path
        iii. true or false
        iv.  Number (can be integer or decimal)
        v.   String (using single quotes)
      d. Example
        i.   "rendered": "installation.user.name.length > 0"
        ii.  "rendered": "installation.mode == 'custom'"
        iii. "rendered": "installation.user.accept = true"
    3. form:
      Inside the “page” there is config attribute that need to be filled. Config is an array of objects that is filled with attributes that will build the wanted form. The objects inside the config array must be filled with the required attributes to work:
      a. label:
        i.   Type: String
        ii.  Value will be used to give the input form a label
      b. type: Type can be filled with one of these 9 values as string:
          - text
          - number
          - time
          - date
          - toggle
          - checkbox
          - dropdown
          - image
          - array
          - map
      c. value:
        i.  Type: Object
        ii. Attributes that can be read from the object:
          1. default
            a. Type: String
            b. Fills in the default value for the form.
            c. Only works for:
              - text
              - number
              - time
              - date
              - toggle (fill with true or false)
              - checkbox (fill the default with the desired value from contents attribute)
              - dropdown (fill the default with the desired value from contents attribute)
            d. If empty, the field will be left empty as default.
          2. placeholder
            a. Type: String
            b. Only for textbox
            c. Fills the textbox with a transparent placeholder.
            d. If empty, there will be no placeholder.
          3. contents
            a. Type: Array
            b. Only works for:
              - checkbox
              - dropdown
            c. To store the contents of the the checkbox and dropdown.
            d. Attribute that is required from the object inside content array:
              i. text
                1. Type: String
                2. The text will be displayed at the checkbox/dropdown
              ii. value
                1. Type: String
                2. The actual value that will be stored from selecting the dropdown/checkbox
