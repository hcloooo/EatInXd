package com.eatinxd.tools;
public class Upload {
    public String Msg;
    public boolean IsOK;
    public String ContentType;
    public String Path;
    public int Size;
    public String FilePath;
    public Upload(String msg, boolean isOK, String contentType, String path,
                  int size,String filePath) {
        super();
        Msg = msg;
        IsOK = isOK;
        ContentType = contentType;
        Path = path;
        Size = size;
        FilePath=filePath;
    }

}
