package com.eatinxd.tools;

import java.io.File;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class Tools {
    public Upload uploadImg(MultipartFile file,Upload upload){
        if (file != null)
        {
            if (file.getContentType().toLowerCase().contains("image"))//非法格式
            {
                if (file.getSize() / 1024 <= upload.Size)//图片大小
                {
                    File directory =new File(upload.Path);
                    //判断目录是否存在，否则创建
                    if (!directory.exists())
                    {
                        directory.mkdir();
                    }

                    //获得后缀 image/jepg
                    String suffix = file.getContentType().substring(file.getContentType().lastIndexOf("/") + 1, file.getContentType().length());
                    //生成guid+后缀
                    String FileName="";
                    while (true)
                    {
                        FileName=UUID.randomUUID().toString() + "." + suffix;
                        File fileInfo=new File(upload.Path + "/" + FileName);
                        if (!fileInfo.exists())//检查本地是否含有当前文件
                        {
                            break;
                        }
                    }
                    try
                    {
                        upload.FilePath=upload.FilePath+FileName;
                        File targetFile=new File(upload.Path,FileName);
                        file.transferTo(targetFile);
                        upload.IsOK = true;//上传成功！
                    }
                    catch (Exception e) {
                        upload.IsOK = false;//上传失败！
                        System.out.println("上传失败");
                    }
                }
                else
                {
                    upload.Msg = "图片大小" + (upload.Size / 1024) + "KB,当前大小" + (file.getSize() / 1024) + "KB";
                }
            }
            else
            {
                upload.Msg = "图片格式有误！";
            }
        }
        return upload;
    }
}
